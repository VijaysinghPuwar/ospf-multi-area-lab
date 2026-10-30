// Canvas layout and labels for the OSPF lab (positions, area boxes, captions).
eval(SFM.getFileContents(BASE + "automation/lib.js"));
var POS = { "ISP": [700, 30], "R1": [700, 165], "SW-BB": [700, 300], "R2": [470, 300], "R4": [930, 300], "R3": [700, 430],
  "R6": [700, 570], "PC-B": [700, 690], "R5": [250, 300], "PC-A": [250, 440], "R8": [40, 300], "R7": [1150, 300], "PARTNER": [1150, 165] };
for (var n in POS) { var d = dev(n); if (d) d.moveToLocation(POS[n][0], POS[n][1]); else log("missing " + n); }
var ids = String(LW.getCanvasNoteIds() || ""); if (ids) { var a = ids.split(","); for (var i = 0; i < a.length; i++) { try { LW.removeCanvasItem(a[i]); } catch (e) {} } }
var lids = String(LW.getCanvasLineIds() || ""); if (lids) { var b = lids.split(","); for (var i = 0; i < b.length; i++) { try { LW.removeCanvasItem(b[i]); } catch (e) {} } }
var NOTES = (typeof LAYOUT_NOTES !== "undefined") ? LAYOUT_NOTES : [];
for (var i = 0; i < NOTES.length; i++) { try { LW.addNote(NOTES[i][0], NOTES[i][1], 0, NOTES[i][2]); } catch (e) { log("note fail " + e); } }
function box(x1, y1, x2, y2, r, g, bl) { try { LW.drawLine(x1, y1, x2, y1, 2, 2, r, g, bl); LW.drawLine(x2, y1, x2, y2, 2, 2, r, g, bl); LW.drawLine(x2, y2, x1, y2, 2, 2, r, g, bl); LW.drawLine(x1, y2, x1, y1, 2, 2, r, g, bl); } catch (e) { log("box fail " + e); } }
var BOXES = (typeof LAYOUT_BOXES !== "undefined") ? LAYOUT_BOXES : [];
for (var i = 0; i < BOXES.length; i++) box.apply(null, BOXES[i]);
log("layout: notes " + NOTES.length + ", boxes " + BOXES.length);
flushLog("automation/logs/layout.log");
