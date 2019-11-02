package com.sharingapp;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class YoutubeLinkModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public YoutubeLinkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void invokeYoutubeApp(String inURL){
        Intent appIntent = new Intent(Intent.ACTION_VIEW);
        try {
            appIntent.setData(Uri.parse(inURL));
            appIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            appIntent.setPackage("com.google.android.youtube");
            reactContext.startActivity(appIntent);
        } catch (ActivityNotFoundException ex) {
            ex.printStackTrace();
        }
        System.out.println(inURL);
    }

    @NonNull
    @Override
    public String getName() {
        return "LoadYoutubeLink";
    }
}
