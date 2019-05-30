package com.blumpapartner;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.horcrux.svg.SvgPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.imagepicker.ImagePickerPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new ImageResizerPackage(),
            new SvgPackage(),
            new ReactNativeOneSignalPackage(),
            new ImagePickerPackage(),
            new BackgroundTaskPackage(),
            new RNBackgroundFetchPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage(),
            new BackgroundGeolocationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BackgroundTaskPackage.useContext(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
