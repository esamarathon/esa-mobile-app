import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.esamobile",
  appName: "ESA Mobile",
  bundledWebRuntime: false,
  webDir: "www",
  cordova: {},
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
    }
  }
}