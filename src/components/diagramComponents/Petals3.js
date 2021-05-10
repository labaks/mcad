import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

export const Petals3 = (props) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Canvas Loaded---");
        const canvas = canvasRef.current;
        handleCanvas(canvas);
    }, [handleCanvas])

    const handleCanvas = (canvas) => {
        if (canvas) {
            const context = canvas.getContext('2d');
            canvas.height = props.height;
            canvas.width = props.width;
            topCountriesPlot(props.data, context, props.title, props.unit);
        }
    };

    const topCountriesPlot = async (data, context, title, unit) => {
        var diameter = Math.min(props.height, props.width);
        var fontZoom = diameter / 600;
        var radius = diameter / 2;

        var gradient = await context.createRadialGradient(
            radius, radius, diameter * 0.43,
            radius, radius, diameter * 0.48);
        gradient.addColorStop(0, "#E8EFC0");
        gradient.addColorStop(1, "#F6F8E9");
        drawCircle(context, radius, radius, diameter * 0.48, "#79A352", gradient);

        gradient = await context.createRadialGradient(
            radius, radius, diameter * 0.38,
            radius, radius, diameter * 0.43);
        gradient.addColorStop(0, "#E8EFC0");
        gradient.addColorStop(1, "#F6F8E9");
        drawCircle(context, radius, radius, diameter * 0.43, "#79A352", gradient);

        drawCircle(context, radius, radius, diameter * 0.38, "#79A352", "#FFFFFF");

        //Background petals:
        context.beginPath();
        context.fillStyle = "#E8EFC0";
        context.moveTo(radius - diameter * 0.37, radius);
        for (var i = 0; i < 10; i++) {
            context.lineTo(
                radius - Math.cos(i * Math.PI / 5) * diameter * 0.37,
                radius - Math.sin(i * Math.PI / 5) * diameter * 0.37)

            context.lineTo(
                radius - Math.cos((i + 0.5) * Math.PI / 5) * diameter * 0.32,
                radius - Math.sin((i + 0.5) * Math.PI / 5) * diameter * 0.32);
        }
        context.fill();

        var colors = ["#E38472", "#FFBCAC", "#F9C87C", "#DEEEAC", "#C0D280", "#90BC99"];
        var colorsDark = ["#C67761", "#DDAD9B", "#DBB86D", "#C8D19C", "#A8BA6D", "#82A587"];

        context.font = "bold " + 16 * fontZoom + "px Arial";
        context.textAlign = "left";

        //Data petals:
        for (var i = 0; i < data.length; i++) {
            var calcStart = Date.now();
            var distance = diameter * 0.4 + diameter * 0.6 * (1 - i / 10),
                a = radius - Math.cos((i + 0.5) * Math.PI / 5) * distance * 0.32,
                b = radius - Math.sin((i + 0.5) * Math.PI / 5) * distance * 0.32,
                c = radius - Math.cos((i + 1.5) * Math.PI / 5) * distance * 0.32,
                d = radius - Math.sin((i + 1.5) * Math.PI / 5) * distance * 0.32;
            var angle = (i + 1) * Math.PI / 5;
            var e = radius - Math.cos(angle - Math.PI / 10) * distance * 0.32,
                f = radius - Math.sin(angle - Math.PI / 10) * distance * 0.32,
                g = radius - Math.cos(angle) * distance * 0.37,
                h = radius - Math.sin(angle) * distance * 0.37,
                ii = radius - Math.cos(angle + Math.PI / 10) * distance * 0.32,
                j = radius - Math.sin(angle + Math.PI / 10) * distance * 0.32;
            var inverse = angle > Math.PI && angle < Math.PI * 2;
            console.log("calc end ", Date.now() - calcStart);
            var drawStart = Date.now();
            context.beginPath();
            gradient = await context.createLinearGradient(a, b, c, d);
            var cIndex = getColorIndexByRate(data[i][2]);
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
            console.log("draw middle ", Date.now() - drawStart);
            await drawTextAlongArc(context, data[i][0], fontZoom * 250, radius, radius, radius - radius / 9.2, angle - Math.PI / 2, inverse);
            console.log("draw end ", Date.now() - drawStart);
        }

        //Minutes/Successful SMS text:
        context.font = "bold " + 16 * fontZoom + "px Arial";
        for (var i = 0; i < data.length; i++) {
            var angle = (i + 1) * Math.PI / 5;
            var inverse = angle > Math.PI && angle < Math.PI * 2;
            await drawTextAlongArc(context, data[i][1] + " " + unit, fontZoom * 250, radius, radius, radius - radius / 4.8, angle - Math.PI / 2, inverse);
        }
        context.textBaseline = "middle";

        context.font = "bold " + 14 * fontZoom + "px Arial";
        context.textAlign = "center";

        //Overlay edges:
        for (var i = 0; i < 10; i++) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "#79A352";
            context.moveTo(radius, radius);
            context.lineTo(
                radius - Math.cos((i + 0.5) * Math.PI / 5) * diameter * 0.48,
                radius - Math.sin((i + 0.5) * Math.PI / 5) * diameter * 0.48);
            context.stroke();

            if (i < data.length && data[i][3] !== null) {
                var circleX = radius - Math.cos((i + 1) * Math.PI / 5) * diameter * 0.27;
                var circleY = radius - Math.sin((i + 1) * Math.PI / 5) * diameter * 0.27;
                drawCircle(context, circleX, circleY, diameter / 25, "#FFFFFF", "#EEEEEE");

                context.fillStyle = "#000000";
                context.fillText("ACD:", circleX, circleY - 6);
                context.fillText(data[i][3], circleX, circleY + 8);
            }
        }

        drawCircle(context, radius, radius, radius * 0.20, "#FFFFFF", "#EEEEEE");
        context.font = "bold " + 16 * fontZoom + "px Arial";
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
        var rates = [1, 3, 7, 10, 15];
        for (var i = rates.length; i > 0; i--) {
            if (rate >= rates[i - 1])
                return i;
        }
        return 0;
    }

    const drawCircle = (context, centerX, centerY, radius, colorStroke, colorFill) => {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = colorFill;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = colorStroke;
        context.stroke();
    };

    const drawTextAlongArc = async (context, str, distanceDiv, centerX, centerY, radius, angle, inverse) => {
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
        borderColor: 'red',
        borderWidth: 1,
    }
})