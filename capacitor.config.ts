import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.chukotka',
  appName: 'Чукотка',
  webDir: 'dist',
  // android: {
  //   allowMixedContent: true
  // },
  server: {
    cleartext: true,
    hostname: "localhost",
    
    // androidScheme: 'https',
  }
};

export default config;
