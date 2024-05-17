import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.umifood.app',
  appName: 'Umi Food',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
