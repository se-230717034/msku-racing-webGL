gdjs.Game_32SceneCode = {};
gdjs.Game_32SceneCode.localVariables = [];
gdjs.Game_32SceneCode.idToCallbackMap = new Map();
gdjs.Game_32SceneCode.GDRoad_95953DObjects1= [];
gdjs.Game_32SceneCode.GDRoad_95953DObjects2= [];
gdjs.Game_32SceneCode.GDRoad_95953DObjects3= [];
gdjs.Game_32SceneCode.GDGrass_95953DObjects1= [];
gdjs.Game_32SceneCode.GDGrass_95953DObjects2= [];
gdjs.Game_32SceneCode.GDGrass_95953DObjects3= [];
gdjs.Game_32SceneCode.GDPlayerCarObjects1= [];
gdjs.Game_32SceneCode.GDPlayerCarObjects2= [];
gdjs.Game_32SceneCode.GDPlayerCarObjects3= [];
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects1= [];
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects2= [];
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects3= [];
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects1= [];
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects2= [];
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects3= [];
gdjs.Game_32SceneCode.GDTrafficConeObjects1= [];
gdjs.Game_32SceneCode.GDTrafficConeObjects2= [];
gdjs.Game_32SceneCode.GDTrafficConeObjects3= [];
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects1= [];
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects2= [];
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects3= [];
gdjs.Game_32SceneCode.GDLapTextObjects1= [];
gdjs.Game_32SceneCode.GDLapTextObjects2= [];
gdjs.Game_32SceneCode.GDLapTextObjects3= [];
gdjs.Game_32SceneCode.GDCheckpointArrowObjects1= [];
gdjs.Game_32SceneCode.GDCheckpointArrowObjects2= [];
gdjs.Game_32SceneCode.GDCheckpointArrowObjects3= [];
gdjs.Game_32SceneCode.GDWalls_95953DObjects1= [];
gdjs.Game_32SceneCode.GDWalls_95953DObjects2= [];
gdjs.Game_32SceneCode.GDWalls_95953DObjects3= [];


gdjs.Game_32SceneCode.mapOfEmptyGDCheckpointArrowObjects = Hashtable.newFrom({"CheckpointArrow": []});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCheckpointArrowObjects1Objects = Hashtable.newFrom({"CheckpointArrow": gdjs.Game_32SceneCode.GDCheckpointArrowObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCheckpointArrowObjects1Objects = Hashtable.newFrom({"CheckpointArrow": gdjs.Game_32SceneCode.GDCheckpointArrowObjects1});
gdjs.Game_32SceneCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Game_32SceneCode.GDCheckpointArrowObjects1, gdjs.Game_32SceneCode.GDCheckpointArrowObjects2);

gdjs.copyArray(gdjs.Game_32SceneCode.GDPlayerCarObjects1, gdjs.Game_32SceneCode.GDPlayerCarObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDCheckpointArrowObjects2.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDCheckpointArrowObjects2[i].getVariableNumber(gdjs.Game_32SceneCode.GDCheckpointArrowObjects2[i].getVariables().getFromIndex(0)) == ((gdjs.Game_32SceneCode.GDPlayerCarObjects2.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Game_32SceneCode.GDPlayerCarObjects2[0].getVariables()).getFromIndex(0).getAsNumber() + 1 ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDCheckpointArrowObjects2[k] = gdjs.Game_32SceneCode.GDCheckpointArrowObjects2[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDCheckpointArrowObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDCheckpointArrowObjects2 */
/* Reuse gdjs.Game_32SceneCode.GDPlayerCarObjects2 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerCarObjects2[i].returnVariable(gdjs.Game_32SceneCode.GDPlayerCarObjects2[i].getVariables().getFromIndex(0)).setNumber(((gdjs.Game_32SceneCode.GDCheckpointArrowObjects2.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Game_32SceneCode.GDCheckpointArrowObjects2[0].getVariables()).getFromIndex(0).getAsNumber());
}
}
}

}


{

/* Reuse gdjs.Game_32SceneCode.GDCheckpointArrowObjects1 */
/* Reuse gdjs.Game_32SceneCode.GDPlayerCarObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[i].getVariableBoolean(gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[i].getVariables().getFromIndex(1), true, false) ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[k] = gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].getVariableNumber(gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].getVariables().getFromIndex(0)) == gdjs.evtTools.object.getSceneInstancesCount(runtimeScene, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCheckpointArrowObjects1Objects) ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDPlayerCarObjects1[k] = gdjs.Game_32SceneCode.GDPlayerCarObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDPlayerCarObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDPlayerCarObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].returnVariable(gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].getVariables().getFromIndex(0)).setNumber(1);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].returnVariable(gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].getVariables().getFromIndex(1)).add(1);
}
}
if (gdjs.Game_32SceneCode.GDPlayerCarObjects1.length > 0) {
  const completedLapTime = gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getTimerElapsedTimeInSeconds("LapTimer");
  if (completedLapTime > 0.5) {
    window.parent.postMessage({ type: "msku-racing:lap-complete", time: completedLapTime }, window.location.origin);
  }
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].resetTimer("LapTimer");
}
}
}

}


};gdjs.Game_32SceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
// msku-racing:desktop-controls
// msku-racing:game-ready
const mskuLoadingScreen = document.getElementById("msku-game-loading");
if (mskuLoadingScreen) {
  mskuLoadingScreen.classList.add("is-ready");
  window.setTimeout(() => mskuLoadingScreen.remove(), 650);
}
window.parent.postMessage({ type: "msku-racing:game-ready" }, window.location.origin);
if (!gdjs.evtTools.common.isMobile()) {
  gdjs.evtTools.camera.hideLayer(runtimeScene, "MobileControls");
}
gdjs.copyArray(runtimeScene.getObjects("CheckpointArrow"), gdjs.Game_32SceneCode.GDCheckpointArrowObjects1);
gdjs.copyArray(runtimeScene.getObjects("PlayerCar"), gdjs.Game_32SceneCode.GDPlayerCarObjects1);
// msku-racing:livery-selection
const selectedLivery = new URLSearchParams(window.location.search).get("livery") || "burgundy";
const liveryPalettes = {
  burgundy: { paint: "#A70C30", trim: "#080D1A", white: "#252B87", accent: "#F5F4EF" },
  navy: { paint: "#252B87", trim: "#080D1A", white: "#A70C30", accent: "#F5F4EF" },
  white: { paint: "#F5F4EF", trim: "#080D1A", white: "#A70C30", accent: "#252B87" },
};
const activeLivery = liveryPalettes[selectedLivery] || liveryPalettes.burgundy;
for (const playerCar of gdjs.Game_32SceneCode.GDPlayerCarObjects1) {
  const modelRoot = playerCar.getRenderer?.().get3DRendererObject?.();
  modelRoot?.traverse((node) => {
    const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : [];
    for (const material of materials) {
      const materialColor = activeLivery[material.name];
      if (materialColor && material.color) {
        material.color.set(materialColor);
        material.needsUpdate = true;
      }
    }
  });
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].returnVariable(gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].getVariables().getFromIndex(0)).setNumber(gdjs.evtTools.object.getSceneInstancesCount(runtimeScene, gdjs.Game_32SceneCode.mapOfEmptyGDCheckpointArrowObjects));
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[i].hide();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("CheckpointArrow"), gdjs.Game_32SceneCode.GDCheckpointArrowObjects1);
gdjs.copyArray(runtimeScene.getObjects("PlayerCar"), gdjs.Game_32SceneCode.GDPlayerCarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.pickNearestObject(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCheckpointArrowObjects1Objects, (( gdjs.Game_32SceneCode.GDPlayerCarObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getCenterXInScene()), (( gdjs.Game_32SceneCode.GDPlayerCarObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getCenterYInScene()), false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.common.angleDifference(gdjs.evtTools.common.angleBetweenPositions((( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getCenterXInScene()), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getCenterYInScene()), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getPointX("TravelDirection")), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getPointY("TravelDirection"))), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getAngleToObject((gdjs.Game_32SceneCode.GDPlayerCarObjects1.length !== 0 ? gdjs.Game_32SceneCode.GDPlayerCarObjects1[0] : null)))) < 90);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.common.angleDifference(gdjs.evtTools.common.angleBetweenPositions((( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getCenterXInScene()), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getCenterYInScene()), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getPointX("TravelDirection")), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getPointY("TravelDirection"))), (( gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDCheckpointArrowObjects1[0].getAngleToObject((gdjs.Game_32SceneCode.GDPlayerCarObjects1.length !== 0 ? gdjs.Game_32SceneCode.GDPlayerCarObjects1[0] : null)))) > -90);
}
}
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("LapText"), gdjs.Game_32SceneCode.GDLapTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("PlayerCar"), gdjs.Game_32SceneCode.GDPlayerCarObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDLapTextObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDLapTextObjects1[i].getBehavior("Text").setText("SÜRE: " + gdjs.evtTools.common.toString(gdjs.evtTools.common.roundTo((( gdjs.Game_32SceneCode.GDPlayerCarObjects1.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getTimerElapsedTimeInSeconds("LapTimer")), 1)) + "\nTUR: " + ((gdjs.Game_32SceneCode.GDPlayerCarObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getVariables()).getFromIndex(1).getAsString());
}
}
}

}


};

gdjs.Game_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32SceneCode.GDRoad_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDRoad_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDRoad_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects3.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects1.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects2.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects3.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects1.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects2.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects3.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects2.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects3.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects3.length = 0;

gdjs.Game_32SceneCode.eventsList1(runtimeScene);
gdjs.Game_32SceneCode.GDRoad_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDRoad_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDRoad_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDGrass_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlayerCarObjects3.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDSpeed_9595JoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDSteer_9595JoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects1.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects2.length = 0;
gdjs.Game_32SceneCode.GDTrafficConeObjects3.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDFinishLine_95953DObjects3.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects1.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects2.length = 0;
gdjs.Game_32SceneCode.GDLapTextObjects3.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects1.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects2.length = 0;
gdjs.Game_32SceneCode.GDCheckpointArrowObjects3.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects1.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects2.length = 0;
gdjs.Game_32SceneCode.GDWalls_95953DObjects3.length = 0;


return;

}

gdjs['Game_32SceneCode'] = gdjs.Game_32SceneCode;
