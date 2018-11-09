// import ExpoMixpanelAnalytics from "expo-mixpanel-analytics";
// const analytics = new ExpoMixpanelAnalytics("f9424c9ccf06e9e442b4d481ce0b0002");

// let env_check = process.env.NODE_ENV === "production";

import { Segment } from "expo";
let androidWriteKey = "muJTIVNiEp2VRiklZ5fWupqtYAADe1Zx";
let iosWriteKey = "FpAMQ2cM1IQ08f81wsHsfPRUGATAysLU";
Segment.initialize({ androidWriteKey, iosWriteKey });

let actions = {
  identify: (id, props) => {
    // if (env_check) analytics.identify(id);
    // analytics.identify(id);
    console.log("entra id");
    if (!props) {
      Segment.identify(id);
    } else {
      Segment.identifyWithTraits(id, props);
    }
  },
  alias: id => {
    // if (env_check) analytics.alias(id);
    // analytics.alias(id);
    Segment.alias(id);
  },
  screen: screenName => {
    // if (env_check) analytics.alias(id);
    // analytics.alias(id);
    Segment.screen(screenName);
  },
  track: (name, props) => {
    // if (env_check) analytics.track(name, props);
    // analytics.track(name, props);

    Segment.track(name, props);
  }
};

export let Mixpanel = actions;
