"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRoundRect = drawRoundRect;
exports.drawNodeBorder = drawNodeBorder;
exports.drawHover = drawHover;
exports.drawLabel = drawLabel;
const TEXT_COLOR = "#000000";
function drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}
function drawNodeBorder(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius + 2, 0, Math.PI * 2, true);
    ctx.closePath();
}
function drawHover(context, data, settings) {
    const size = settings.labelSize;
    const font = settings.labelFont;
    const weight = settings.labelWeight;
    const subLabelSize = size - 2;
    const label = data.label;
    const subLabel = "";
    const clusterLabel = "";
    context.beginPath();
    context.fillStyle = "#fff";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 2;
    context.shadowBlur = 8;
    context.shadowColor = "#000";
    context.font = `${weight} ${size}px ${font}`;
    const labelWidth = context.measureText(label).width;
    context.font = `${weight} ${subLabelSize}px ${font}`;
    const subLabelWidth = subLabel ? context.measureText(subLabel).width : 0;
    context.font = `${weight} ${subLabelSize}px ${font}`;
    const clusterLabelWidth = clusterLabel ? context.measureText(clusterLabel).width : 0;
    const textWidth = Math.max(labelWidth, subLabelWidth, clusterLabelWidth);
    const x = Math.round(data.x);
    const y = Math.round(data.y);
    const w = Math.round(textWidth + size / 2 + data.size + 3);
    const hLabel = Math.round(size / 2 + 4);
    const hSubLabel = subLabel ? Math.round(subLabelSize / 2 + 9) : 0;
    const hClusterLabel = Math.round(subLabelSize / 2 + 9);
    const boxHeight = hClusterLabel + hLabel + hSubLabel + 12 + data.size;
    let rectY = y - boxHeight / 2 - data.size / 2 - 5;
    if (!subLabel) {
        rectY -= 7;
    }
    drawRoundRect(context, x - w / 2, y - boxHeight - 5, w, hClusterLabel + hLabel + hSubLabel + 12, 5);
    context.closePath();
    context.fill();
    drawNodeBorder(context, x, y, data.size);
    context.fill();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.fillStyle = TEXT_COLOR;
    context.font = `${weight} ${size}px ${font}`;
    context.fillText(label, x - w / 2 + data.size + 3 - data.size / 2, rectY + size);
}
function drawLabel(context, data, settings) {
    if (!data.label)
        return;
    const size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight;
    context.font = `${weight} ${size}px ${font}`;
    const width = context.measureText(data.label).width + 8;
    context.fillStyle = "#ffffffcc";
    context.fillRect(data.x + data.size, data.y + size / 3 - 15, width, 20);
    context.fillStyle = "#000";
    context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
}
//# sourceMappingURL=canvas-utils.js.map