// import ExpoMixpanelAnalytics from "expo-mixpanel-analytics";
// const analytics = new ExpoMixpanelAnalytics("f9424c9ccf06e9e442b4d481ce0b0002");

// let env_check = process.env.NODE_ENV === "production";

import { Segment } from "expo";
let androidWriteKey = "muJTIVNiEp2VRiklZ5fWupqtYAADe1Zx";
let iosWriteKey = "FpAMQ2cM1IQ08f81wsHsfPRUGATAysLU";
Segment.initialize({ androidWriteKey, iosWriteKey });

let actions = {
  identify: id => {
    // if (env_check) analytics.identify(id);
    // analytics.identify(id);
    console.log("entra id");
    Segment.identify(id);
  },
  alias: id => {
    // if (env_check) analytics.alias(id);
    // analytics.alias(id);
    Segment.alias(id);
  },
  track: (name, props) => {
    // if (env_check) analytics.track(name, props);
    // analytics.track(name, props);
    console.log("entra");
    Segment.track(name, props);
  },
  people: {
    set: props => {
      // if (env_check) analytics.people.set(props);
      // analytics.people.set(props);
      Segment.people.set(props);
    }
  }
};

export let Mixpanel = actions;
