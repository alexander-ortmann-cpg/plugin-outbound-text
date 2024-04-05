import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import OutboundMessagePanel from "./components/OutboundMessagePanel/OutboundMessagePanel.Container";
import OutboundPanelButton from "./components/OutboundPanelButton";
import "./actions/toggleOutboundMessagePanel";
import "./actions/sendOutboundMessage";
import registerNotifications from "./utils/notifications";
import { CustomizationProvider } from "@twilio-paste/core/customization";


const PLUGIN_NAME = 'OutboundTextPlugin';

export default class OutboundTextPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   * 
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {

    if (manager.workerClient.attributes.country == "US") {
      flex.setProviders({
        PasteThemeProvider: CustomizationProvider,
      });

      registerNotifications(manager);

      flex.MainContainer.Content.add(
        <OutboundMessagePanel key="outbound-message-panel" />
      );

      flex.MainHeader.Content.remove("dialpad-button");
      flex.MainHeader.Content.add(
        <OutboundPanelButton
          outboundPanelType="voice"
          key="voice-dialpad-button"
        />,
        { sortOrder: 1, align: "end" }
      );

      flex.MainHeader.Content.add(
        <OutboundPanelButton
          outboundPanelType="message"
          key="message-dialpad-button"
        />,
        { sortOrder: 0, align: "end" }
      );
    }

  }
}
