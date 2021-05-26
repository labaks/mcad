import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

export const Petals = (props) => {

    const canvasRef = useRef(null);

    let diameter, fontZoom, radius;
    let radius1, radius2, radius3, gradient1, gradient2, x1, diameter1, diameter2, diameter3, coef1;
    let font1, font2, coef4, coef5, coef6, distanceDiv;

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Canvas Loaded---");
        const canvas = canvasRef.current;
        handleCanvas(canvas);
    }, [handleCanvas, props])

    const handleCanvas = async (canvas) => {
        if (canvas) {
            const context = canvas.getContext('2d');
            canvas.height = props.height;
            canvas.width = props.width;
            await calcPetalValues(context);
            topCountriesPlot(props.data, context, props.title, props.unit);
        }
    };

    const calcPetalValues = async (context) => {
        diameter = Math.min(props.height, props.width);
        fontZoom = diameter / 600;
        radius = diameter / 2;

        radius1 = diameter * 0.43;
        radius2 = diameter * 0.48;
        radius3 = diameter * 0.38;

        diameter1 = diameter * 0.37;
        diameter2 = diameter * 0.32;
        diameter3 = diameter * 0.27;

        x1 = radius - diameter1;

        coef1 = Math.PI / 5;
        coef4 = diameter * 0.4;
        coef5 = diameter * 0.6;
        coef6 = Math.PI / 10;

        gradient1 = await context.createRadialGradient(
            radius, radius, radius1,
            radius, radius, radius2);
        gradient1.addColorStop(0, "#E8EFC0");
        gradient1.addColorStop(1, "#F6F8E9");

        gradient2 = await context.createRadialGradient(
            radius, radius, radius3,
            radius, radius, radius1);
        gradient2.addColorStop(0, "#E8EFC0");
        gradient2.addColorStop(1, "#F6F8E9");

        font1 = "bold " + 16 * fontZoom + "px Arial";
        font2 = "bold " + 14 * fontZoom + "px Arial";

        distanceDiv = fontZoom * 250;
    }

    const topCountriesPlot = async (data, context, title, unit) => {
        var colors = ["#E38472", "#FFBCAC", "#F9C87C", "#DEEEAC", "#C0D280", "#90BC99"];
        var colorsDark = ["#C67761", "#DDAD9B", "#DBB86D", "#C8D19C", "#A8BA6D", "#82A587"];

        drawBackground(context);

        context.font = font1;
        context.textAlign = "left";

        //Data petals:
        for (let i = 0; i < data.length; i++) {
            let distance = coef4 + coef5 * (1 - i / 10),
                w1 = distance * 0.32,
                w2 = distance * 0.37,
                an1 = (i + 0.5) * coef1,
                an2 = (i + 1.5) * coef1,
                a = radius - Math.cos(an1) * w1,
                b = radius - Math.sin(an1) * w1,
                c = radius - Math.cos(an2) * w1,
                d = radius - Math.sin(an2) * w1;
            let angle = (i + 1) * coef1;
            let e = radius - Math.cos(angle - coef6) * w1,
                f = radius - Math.sin(angle - coef6) * w1,
                g = radius - Math.cos(angle) * w2,
                h = radius - Math.sin(angle) * w2,
                ii = radius - Math.cos(angle + coef6) * w1,
                j = radius - Math.sin(angle + coef6) * w1;
            let inverse = angle > Math.PI && angle < Math.PI * 2;
            context.beginPath();
            let gradient = await context.createLinearGradient(a, b, c, d);
            var cIndex = getColorIndexByRate(data[i].asr);
            gradient.addColorStop(0, colorsDark[cIndex]);
            gradient.addColorStop(0.5, colors[cIndex]);
            gradient.addColorStop(1, colorsDark[cIndex]);
            context.fillStyle = gradient;
            context.strokeStyle = "#FFFFFF";

            //Fill
            context.moveTo(radius, radius);
            context.lineTo(e, f);
            context.lineTo(g, h);
            context.lineTo(ii, j);
            context.fill();

            //Stroke sagittal lines
            context.beginPath();
            context.moveTo(e, f);
            context.lineTo(radius, radius);
            context.lineTo(ii, j);
            context.lineWidth = 6;
            context.stroke();

            //Stroke meridional lines
            context.beginPath();
            context.moveTo(e, f);
            context.lineTo(g, h);
            context.lineTo(ii, j);
            context.lineWidth = 2;
            context.stroke();

            context.fillStyle = "#000000";
            await drawTextAlongArc(context, data[i].country, radius, radius, radius - radius / 9.2, angle - Math.PI / 2, inverse);
        }

        // Minutes/Successful SMS text:
        context.font = font1;
        for (let i = 0; i < data.length; i++) {
            let angle = (i + 1) * coef1;
            let inverse = angle > Math.PI && angle < Math.PI * 2;
            await drawTextAlongArc(context, `${data[i].duration}  ${unit}`, radius, radius, radius - radius / 4.8, angle - Math.PI / 2, inverse);
        }
        context.textBaseline = "middle";

        context.font = font2;
        context.textAlign = "center";

        //Overlay edges:
        for (let i = 0; i < 10; i++) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "#79A352";
            context.moveTo(radius, radius);
            let an1 = (i + 0.5) * coef1
            context.lineTo(
                radius - Math.cos(an1) * radius2,
                radius - Math.sin(an1) * radius2);
            context.stroke();
            let acdFormat = '';
            if (data[i] !== undefined) {
                acdFormat = ~~(data[i].acd / 60) + ':' + data[i].acd % 60;
                if (i < data.length) {
                    let an2 = (i + 1) * coef1
                    let circleX = radius - Math.cos(an2) * diameter3;
                    let circleY = radius - Math.sin(an2) * diameter3;
                    drawCircle(context, circleX, circleY, diameter / 25, "#FFFFFF", "#EEEEEE");

                    context.fillStyle = "#000000";
                    context.fillText("ACD:", circleX, circleY - 6);
                    context.fillText(acdFormat, circleX, circleY + 8);
                }
            }
        }


        // Top 10 Countries circle
        drawCircle(context, radius, radius, radius * 0.20, "#FFFFFF", "#EEEEEE");
        context.font = font1;
        context.fillStyle = "#000000";
        var titleParts = separateText(title);
        context.fillText(titleParts[0], radius, radius - 8);
        context.fillText(titleParts[1], radius, radius + 8);

    };

    const separateText = (text) => {
        var textParts = text.split(" ");
        var topPart = textParts[0] + " " + textParts[1];
        var bottomHalf = textParts[2];
        return [topPart, bottomHalf];
    }

    const getColorIndexByRate = (rate) => {
        const rates = [1, 3, 7, 10, 15];
        for (let i = rates.length; i > 0; i--) {
            if (rate >= rates[i - 1])
                return i;
        }
        return 0;
    }

    const drawBackground = (context) => {

        drawCircle(context, radius, radius, radius2, "#79A352", gradient1);
        drawCircle(context, radius, radius, radius1, "#79A352", gradient2);
        drawCircle(context, radius, radius, radius3, "#79A352", "#FFFFFF");

        //Background petals:
        context.beginPath();
        context.fillStyle = "#E8EFC0";
        context.moveTo(x1, radius);
        for (let i = 0; i < 10; i++) {
            let coef2 = i * coef1,
                coef3 = (i + 0.5) * coef1;
            context.lineTo(
                radius - Math.cos(coef2) * diameter1,
                radius - Math.sin(coef2) * diameter1)
            context.lineTo(
                radius - Math.cos(coef3) * diameter2,
                radius - Math.sin(coef3) * diameter2);
        }
        context.fill();
    }

    const drawCircle = (context, centerX, centerY, radius, colorStroke, colorFill) => {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.fillStyle = colorFill;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = colorStroke;
        context.stroke();
    };

    const drawTextAlongArc = async (context, str, centerX, centerY, radius, angle, inverse) => {
        var resultRadius = radius;
        if (inverse) {
            angle += Math.PI;
            resultRadius = radius * -1.04; //Move baseline of inverted text to be on the same arc as normal text
            distanceDiv = -distanceDiv
        }
        context.save();
        context.translate(centerX, centerY);
        let strWidth = (await context.measureText(str)).width;
        if (strWidth > 0.55 * radius) {
            while (strWidth > 0.5 * radius) {
                str = str.substring(0, str.length - 1);
                strWidth = (await context.measureText(str)).width;
            }
            str += "...";
        }
        var len = str.length;
        var start = angle - strWidth / (distanceDiv * 2);
        context.rotate(start);
        for (var n = 0; n < len; n++) {
            context.fillText(str[n], 0, -resultRadius);
            let letterMeasure = await context.measureText(str[n])
            context.rotate(letterMeasure.width / distanceDiv);
        }
        context.restore();
    };

    return (
        <Canvas
            style={styles.canvas}
            ref={canvasRef}
            {...props} />
    )
}

const styles = StyleSheet.create({
    canvas: {
    }
})