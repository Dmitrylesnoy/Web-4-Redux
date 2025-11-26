import styles from "./MyForm.module.css";

export function MyForm() {
  return (
    <div className={styles.card}>
      <form id="formCoords">
        <div className={styles.inputGroup}>
          <label for="x" className={styles.requiredField}>
            X:
          </label>
          <selectOneRadio id="x" value="#{point.x}" required="true" validator="#{validator.validatePointX}">
            <f:selectItem itemValue="-4" itemLabel="-4" />
            <f:selectItem itemValue="-3" itemLabel="-3" />
            <f:selectItem itemValue="-2" itemLabel="-2" />
            <f:selectItem itemValue="-1" itemLabel="-1" />
            <f:selectItem itemValue="0" itemLabel="0" />
            <f:selectItem itemValue="1" itemLabel="1" />
            <f:selectItem itemValue="2" itemLabel="2" />
            <f:selectItem itemValue="3" itemLabel="3" />
            <f:selectItem itemValue="4" itemLabel="4" />
          </selectOneRadio>
          <message for="x" styleClass="error-message" />
        </div>
        <div className={styles.inputGroup}>
          <label for="y" className={styles.requiredField}>
            Y:
          </label>
          <inputText
            id="y"
            value="#{point.y}"
            required="true"
            validator="#{validator.validatePointY}"
            maxlength="8"
            placeholder="От -5 до 3"
          />
          <br />
          <message for="y" styleClass="error-message" />
        </div>
        <div id="r-group" className={styles.inputGroup}>
          <label for="r" className={styles.requiredField}>
            R:
          </label>
          <inputHidden id="r" value="#{Rbean.value}" validator="#{validator.validateR}" />
          {/* <commandButton id="rButton" styleClass="ui-button" value="#{Rbean.value}">
            <f:ajax execute="@this" listener="#{Rbean.updateValue}" render="r-group r rButton" />
          </commandButton> */}
          <br />
          <message for="r" styleClass="error-message" />
        </div>
        <div>
          {/* <commandButton id="submitBtn" styleClass="ui-button" value="Check" action="#{inputProcess.submitPoint}">
            <f:ajax execute="@form" render="@form tableData" oncomplete="loadPointsData(); updateGraph();" />
          </commandButton>
          <commandButton id="resetBtn" styleClass="ui-button" value="Reset" action="#{Rbean.reset}" immediate="true">
            <f:ajax execute="@this" render="@form" />
          </commandButton> */}
        </div>
      </form>
    </div>
  );
}
