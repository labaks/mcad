import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Canvas from 'react-native-canvas';

import { Loader } from '../Loader';

export const Petals = (props) => {

    const canvasRef = useRef(null);

    const [loading, setLoading] = useState(true);

    let diameter, fontZoom, radius;
    let radius1, radius2, radius3, gradient1, gradient2, x1, diameter1, diameter2, diameter3, coef1;
    let font1, font2, coef4, coef5, coef6, distanceDiv;

    let drawValues = [];
    let wordsMeasures = [];

    const colors = ["#E38472", "#FFBCAC", "#F9C87C", "#DEEEAC", "#C0D280", "#90BC99"];
    const colorsDark = ["#C67761", "#DDAD9B", "#DBB86D", "#C8D19C", "#A8BA6D", "#82A587"];

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Canvas Loaded---");
        const canvas = canvasRef.current;
        handleCanvas(canvas);

    }, [handleCanvas])

    const handleCanvas = async (canvas) => {
        if (canvas) {
            const context = canvas.getContext('2d');
            canvas.height = props.height;
            canvas.width = props.width;
            await calcPetalValues(context, props.data);
            await calcWordsMeasures(context, props.data, wordsMeasures, distanceDiv);
            topCountriesPlot(props.data, context, props.title, props.unit);
        }
    };

    const calcPetalValues = async (context, data) => {
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

        for (let i = 0; i < 10; i++) {
            let obj = {};
            obj.distance = coef4 + coef5 * (1 - i / 10);
            obj.w1 = obj.distance * 0.32;
            obj.w2 = obj.distance * 0.37;
            obj.an1 = (i + 0.5) * coef1;
            obj.an2 = (i + 1.5) * coef1;
            obj.an3 = (i + 1) * coef1;
            obj.an4 = i * coef1;
            obj.an5 = obj.an3 - Math.PI / 2;
            obj.a = radius - Math.cos(obj.an1) * obj.w1;
            obj.b = radius - Math.sin(obj.an1) * obj.w1;
            obj.c = radius - Math.cos(obj.an2) * obj.w1;
            obj.d = radius - Math.sin(obj.an2) * obj.w1;
            obj.e = radius - Math.cos(obj.an3 - coef6) * obj.w1;
            obj.f = radius - Math.sin(obj.an3 - coef6) * obj.w1;
            obj.g = radius - Math.cos(obj.an3) * obj.w2;
            obj.h = radius - Math.sin(obj.an3) * obj.w2;
            obj.ii = radius - Math.cos(obj.an3 + coef6) * obj.w1;
            obj.j = radius - Math.sin(obj.an3 + coef6) * obj.w1;
            obj.inverse = obj.an3 > Math.PI && obj.an3 < Math.PI * 2;
            obj.k = radius - Math.cos(obj.an1) * radius2;
            obj.l = radius - Math.sin(obj.an1) * radius2;
            obj.m = radius - Math.cos(obj.an1) * diameter2;
            obj.n = radius - Math.sin(obj.an1) * diameter2;
            obj.o = radius - Math.cos(obj.an4) * diameter1;
            obj.p = radius - Math.sin(obj.an4) * diameter1;
            if (data[i] !== undefined) {
                obj.gradient = await context.createLinearGradient(obj.a, obj.b, obj.c, obj.d);
                obj.cIndex = getColorIndexByRate(data[i].asr);
                obj.gradient.addColorStop(0, colorsDark[obj.cIndex]);
                obj.gradient.addColorStop(0.5, colors[obj.cIndex]);
                obj.gradient.addColorStop(1, colorsDark[obj.cIndex]);
                if (i < data.length) {
                    obj.acdFormat = ~~(data[i].acd / 60) + ':' + data[i].acd % 60;
                    obj.circleX = radius - Math.cos(obj.an3) * diameter3;
                    obj.circleY = radius - Math.sin(obj.an3) * diameter3;
                }
            }
            drawValues.push(obj);
        }
    }

    const topCountriesPlot = async (data, context, title, unit) => {

        context.clearRect(0, 0, props.width, props.height)

        drawBackground(context);

        //Data petals:
        for (let i = 0; i < 10; i++) {
            context.font = font1;
            context.textAlign = "left";
            context.beginPath();

            if (data[i] !== undefined) {
                context.fillStyle = drawValues[i].gradient;
                context.strokeStyle = "#FFFFFF";
                //Fill
                context.moveTo(radius, radius);
                context.lineTo(drawValues[i].e, drawValues[i].f);
                context.lineTo(drawValues[i].g, drawValues[i].h);
                context.lineTo(drawValues[i].ii, drawValues[i].j);
                context.fill();
                //Stroke sagittal lines
                context.beginPath();
                context.moveTo(drawValues[i].e, drawValues[i].f);
                context.lineTo(radius, radius);
                context.lineTo(drawValues[i].ii, drawValues[i].j);
                context.lineWidth = 6;
                context.stroke();
                //Stroke meridional lines
                context.beginPath();
                context.moveTo(drawValues[i].e, drawValues[i].f);
                context.lineTo(drawValues[i].g, drawValues[i].h);
                context.lineTo(drawValues[i].ii, drawValues[i].j);
                context.lineWidth = 2;
                context.stroke();
                context.fillStyle = "#000000";

                drawTextAlongArc(
                    context,
                    wordsMeasures[i],
                    radius,
                    radius,
                    radius - radius / 9.2,
                    distanceDiv,
                    drawValues[i].inverse,
                    true
                );
                // Minutes/Successful SMS text:
                drawTextAlongArc(
                    context,
                    wordsMeasures[i],
                    radius,
                    radius,
                    radius - radius / 4.8,
                    distanceDiv,
                    drawValues[i].inverse,
                    false
                );
                if (i < data.length) {
                    context.textBaseline = "middle";
                    context.font = font2;
                    context.textAlign = "center";
                    drawCircle(context, drawValues[i].circleX, drawValues[i].circleY, diameter / 25, "#FFFFFF", "#EEEEEE");
                    context.fillStyle = "#000000";
                    context.fillText("ACD:", drawValues[i].circleX, drawValues[i].circleY - 6);
                    context.fillText(drawValues[i].acdFormat, drawValues[i].circleX, drawValues[i].circleY + 8);
                }
            }
            //Overlay edges:
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "#79A352";
            context.moveTo(radius, radius);
            context.lineTo(drawValues[i].k, drawValues[i].l);
            context.stroke();
        }
        // Top 10 Countries circle
        drawCircle(context, radius, radius, radius * 0.20, "#FFFFFF", "#EEEEEE");
        // context.font = font1;
        // context.fillStyle = "#000000";
        // var titleParts = separateText(title);
        // context.fillText(titleParts[0], radius, radius - 8);
        // context.fillText(titleParts[1], radius, radius + 8);

        setLoading(false);
    };

    const separateText = (text) => {
        var textParts = text.split(" ");
        var topPart = textParts[0] + " " + textParts[1];
        var bottomHalf = textParts[2];
        return [topPart, bottomHalf];
    };

    const getColorIndexByRate = (rate) => {
        const rates = [1, 3, 7, 10, 15];
        for (let i = rates.length; i > 0; i--) {
            if (rate >= rates[i - 1])
                return i;
        }
        return 0;
    };

    const drawBackground = (context) => {
        drawCircle(context, radius, radius, radius2, "#79A352", gradient1);
        drawCircle(context, radius, radius, radius1, "#79A352", gradient2);
        drawCircle(context, radius, radius, radius3, "#79A352", "#FFFFFF");
        //Background petals:
        context.beginPath();
        context.fillStyle = "#E8EFC0";
        context.moveTo(x1, radius);
        for (let i = 0; i < 10; i++) {
            context.lineTo(drawValues[i].o, drawValues[i].p);
            context.lineTo(drawValues[i].m, drawValues[i].n);
        }
        context.fill();
    };

    const drawCircle = (context, centerX, centerY, radius, colorStroke, colorFill) => {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.fillStyle = colorFill;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = colorStroke;
        context.stroke();
    };

    const drawTextAlongArc = (context, measure, centerX, centerY, radius, distanceDiv, inverse, countries) => {
        let resultRadius = radius;
        if (inverse) {
            resultRadius = radius * -1.04; //Move baseline of inverted text to be on the same arc as normal text
            distanceDiv = -distanceDiv;
        }
        context.save();
        context.translate(centerX, centerY);
        if (countries) {
            context.rotate(measure.countryStart);
            for (let i = 0; i < measure.countryLen; i++) {
                context.fillText(measure.countryStr[i], 0, -resultRadius);
                context.rotate(measure.countryLetters[i] / distanceDiv);
            }
        } else {
            context.rotate(measure.durationStart);
            for (let i = 0; i < measure.durationLen; i++) {
                context.fillText(measure.durationStr[i], 0, -resultRadius);
                context.rotate(measure.durationLetters[i] / distanceDiv);
            }
        }
        context.restore();
    };

    const calcWordsMeasures = async (context, data, measures, distanceDiv) => {
        for (let i = 0; i < data.length; i++) {
            let angle = drawValues[i].an5;
            let localDistanceDiv = distanceDiv;
            let obj = {};
            if (drawValues[i].inverse) {
                angle += Math.PI;
                localDistanceDiv = -localDistanceDiv;
            }
            obj.countryStr = data[i].country;
            obj.durationStr = data[i].duration + " " + props.unit;
            obj.countryStrWidth = (await context.measureText(obj.countryStr)).width;
            obj.durationStrWidth = (await context.measureText(obj.durationStr)).width;
            if (obj.countryStrWidth > 0.55 * radius) {
                while (obj.countryStrWidth > 0.43 * radius) {
                    obj.countryStr = obj.countryStr.substring(0, obj.countryStr.length - 1);
                    obj.countryStrWidth = (await context.measureText(obj.countryStr)).width;
                }
                obj.countryStr += "...";
            }
            obj.countryLen = obj.countryStr.length;
            obj.durationLen = obj.durationStr.length;

            obj.countryStart = angle - obj.countryStrWidth / (localDistanceDiv * 2);
            obj.durationStart = angle - obj.durationStrWidth / (localDistanceDiv * 2);
            obj.countryLetters = [];
            for (let n = 0; n < obj.countryLen; n++) {
                obj.countryLetters[n] = (await context.measureText(obj.countryStr[n])).width;
            }
            obj.durationLetters = [];
            for (let n = 0; n < obj.durationLen; n++) {
                obj.durationLetters[n] = (await context.measureText(obj.durationStr[n])).width;
            }
            measures.push(obj);
        }
    }

    return (
        <View>
            <Loader loading={loading} />
            <Canvas
                style={styles.canvas}
                ref={canvasRef}
                {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    canvas: {
    }
})