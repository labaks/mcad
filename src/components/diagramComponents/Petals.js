import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';

export class Petals extends React.Component {

    data = [["Ukraine", 2, 16.67, ~~(75 / 60) + ':' + 75 % 60]];
    title = "Top 10 Countries";
    unit = "min.";

    _onGLCreate = (gl) => {
        var ctx = new Expo2DContext(gl);
        this.topCountriesPlot(this.data, ctx.gl, 200, 200, this.title, this.unit);
    }

    async topCountriesPlot(data, ctx, width, height, title, unit) {
        console.log("ctx: ", ctx)
        var diameter = Math.min(width, height);
        var fontZoom = diameter / 600;
        var radius = diameter / 2;
        var context = ctx

        var gradient = context.createRadialGradient(
            radius, radius, diameter * 0.43,
            radius, radius, diameter * 0.48);
        gradient.addColorStop(0, "#E8EFC0");
        gradient.addColorStop(1, "#F6F8E9");
        this.drawCircle(context, radius, radius, diameter * 0.48, "#79A352", gradient);

        gradient = context.createRadialGradient(
            radius, radius, diameter * 0.38,
            radius, radius, diameter * 0.43);
        gradient.addColorStop(0, "#E8EFC0");
        gradient.addColorStop(1, "#F6F8E9");
        this.drawCircle(context, radius, radius, diameter * 0.43, "#79A352", gradient);

        this.drawCircle(context, radius, radius, diameter * 0.38, "#79A352", "#FFFFFF");

        //Background petals:
        context.beginPath();
        context.fillStyle = "#E8EFC0";
        context.moveTo(radius - diameter * 0.37, radius);
        for (var i = 0; i < 10; i++) {
            context.lineTo(
                radius - Math.cos(i * Math.PI / 5) * diameter * 0.37,
                radius - Math.sin(i * Math.PI / 5) * diameter * 0.37);

            context.lineTo(
                radius - Math.cos((i + 0.5) * Math.PI / 5) * diameter * 0.32,
                radius - Math.sin((i + 0.5) * Math.PI / 5) * diameter * 0.32);
        }
        context.fill();

        var colors = ["#E38472", "#FFBCAC", "#F9C87C", "#DEEEAC", "#C0D280", "#90BC99"];
        var colorsDark = ["#C67761", "#DDAD9B", "#DBB86D", "#C8D19C", "#A8BA6D", "#82A587"];

        // context.font = "bold " + 16 * fontZoom + "px Arial";
        await context.initializeText();
        context.font = "bold 16pt sans-serif";
        context.textAlign = "left";

        //Data petals:
        for (var i = 0; i < data.length; i++) {
            context.beginPath();
            var distance = diameter * 0.4 + diameter * 0.6 * (1 - i / 10);
            gradient = context.createLinearGradient(
                radius - Math.cos((i + 0.5) * Math.PI / 5) * distance * 0.32,
                radius - Math.sin((i + 0.5) * Math.PI / 5) * distance * 0.32,
                radius - Math.cos((i + 1.5) * Math.PI / 5) * distance * 0.32,
                radius - Math.sin((i + 1.5) * Math.PI / 5) * distance * 0.32);
            var cIndex = this.getColorIndexByRate(data[i][2]);
            gradient.addColorStop(0, colorsDark[cIndex]);
            gradient.addColorStop(0.5, colors[cIndex]);
            gradient.addColorStop(1, colorsDark[cIndex]);
            context.fillStyle = gradient;
            context.strokeStyle = "#FFFFFF";
            var angle = (i + 1) * Math.PI / 5;

            //Fill
            context.moveTo(radius, radius);
            context.lineTo(
                radius - Math.cos(angle - Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle - Math.PI / 10) * distance * 0.32);
            context.lineTo(
                radius - Math.cos(angle) * distance * 0.37,
                radius - Math.sin(angle) * distance * 0.37);
            context.lineTo(
                radius - Math.cos(angle + Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle + Math.PI / 10) * distance * 0.32);
            context.fill();

            //Stroke sagittal lines
            context.beginPath();
            context.moveTo(
                radius - Math.cos(angle - Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle - Math.PI / 10) * distance * 0.32);
            context.lineTo(radius, radius);
            context.lineTo(
                radius - Math.cos(angle + Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle + Math.PI / 10) * distance * 0.32);
            context.lineWidth = 6;
            context.stroke();

            //Stroke meridional lines
            context.beginPath();
            context.moveTo(
                radius - Math.cos(angle - Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle - Math.PI / 10) * distance * 0.32);
            context.lineTo(
                radius - Math.cos(angle) * distance * 0.37,
                radius - Math.sin(angle) * distance * 0.37);
            context.lineTo(
                radius - Math.cos(angle + Math.PI / 10) * distance * 0.32,
                radius - Math.sin(angle + Math.PI / 10) * distance * 0.32);
            context.lineWidth = 2;
            context.stroke();

            context.fillStyle = "#000000";
            var inverse = angle > Math.PI && angle < Math.PI * 2;
            this.drawTextAlongArc(context, data[i][0], fontZoom * 250, radius, radius, radius - radius / 9.2, angle - Math.PI / 2, inverse);
        }

        //Minutes/Successful SMS text:
        await context.initializeText();
        // context.font = "bold " + 16 * fontZoom + "px Arial";
        context.font = "bold 16pt sans-serif";
        for (var i = 0; i < data.length; i++) {
            var angle = (i + 1) * Math.PI / 5;
            var inverse = angle > Math.PI && angle < Math.PI * 2;
            this.drawTextAlongArc(context, data[i][1] + " " + unit, fontZoom * 250, radius, radius, radius - radius / 4.8, angle - Math.PI / 2, inverse);
        }
        context.textBaseline = "middle";

        await context.initializeText();
        // context.font = "bold " + 14 * fontZoom + "px Arial";
        context.font = "bold 14pt sans-serif";
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
                this.drawCircle(context, circleX, circleY, diameter / 25, "#FFFFFF", "#EEEEEE");

                context.fillStyle = "#000000";
                context.fillText("ACD:", circleX, circleY - 6);
                context.fillText(data[i][3], circleX, circleY + 8);
            }
        }

        this.drawCircle(context, radius, radius, radius * 0.20, "#FFFFFF", "#EEEEEE");
        await context.initializeText();
        context.font = "bold 16pt sans-serif";
        context.fillStyle = "#000000";
        var titleParts = this.separateText(title);
        context.fillText(titleParts[0], radius, radius - 8);
        context.fillText(titleParts[1], radius, radius + 8);
    }

    separateText(text) {
        var textParts = text.split(" ");
        var topPart = textParts[0] + " " + textParts[1];
        var bottomHalf = textParts[2];
        return [topPart, bottomHalf];
    }

    getColorIndexByRate(rate) {
        var rates = [1, 3, 7, 10, 15];
        for (var i = rates.length; i > 0; i--) {
            if (rate >= rates[i - 1])
                return i;
        }
        return 0;
    }

    drawCircle(context, centerX, centerY, radius, colorStroke, colorFill) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = colorFill;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = colorStroke;
        context.stroke();
    }

    drawTextAlongArc(context, str, distanceDiv, centerX, centerY, radius, angle, inverse) {
        var resultRadius = radius;
        if (inverse) {
            angle += Math.PI;
            resultRadius = radius * -1.04; //Move baseline of inverted text to be on the same arc as normal text
            distanceDiv = -distanceDiv;
        }
        context.save();
        context.translate(centerX, centerY);
        if (context.measureText(str).width > 0.55 * radius) {
            while (context.measureText(str).width > 0.5 * radius) {
                str = str.substring(0, str.length - 1);
            }
            str += "...";
        }
        var len = str.length;
        context.rotate(angle - (context.measureText(str).width) / (distanceDiv * 2));
        for (var n = 0; n < len; n++) {
            context.fillText(str[n], 0, -resultRadius);
            context.rotate(context.measureText(str[n]).width / distanceDiv);
        }
        context.restore();
    }

    render() {
        return (
            <View style={styles.container}>
                <GLView
                    style={{ flex: 1 }}
                    onContextCreate={this._onGLCreate} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'yellow',
        borderWidth: 1,
        height: 200,
        width: 200
    }
})