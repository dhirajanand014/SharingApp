import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, BackHandler, NativeModules } from 'react-native';
import { WebView } from 'react-native-webview';
export function App() {
    const [webviewState, setWebviewState] = useState({
        goBack: true,
        isLoading: false
    });
    const webview = useRef(null);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // returned function will be called on component unmount 
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, []);

    const handleBackButton = (event) => {
        if (webview.current) {
            webview.current.goBack();
            return true; // prevent default behavior (exit app)
        }
        return false;
    };

    const interceptYoutubeApp = (event) => {
        webviewState.goBack = event.canGoBack;
        try {
            const youtubeUrl = event.url;
            const isYoutube = youtubeUrl && youtubeUrl.includes("youtube");
            setWebviewState({ ...webviewState });
            if (isYoutube) {
                NativeModules.LoadYoutubeLink.invokeYoutubeApp(event.url);
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    const loadStart = () => {
        webviewState.isLoading = true;
        setWebviewState({ ...webviewState });
    }

    const loadStop = () => {
        webviewState.isLoading = false;
        setWebviewState({ ...webviewState });
    }
    return (
        <View style={{ flex: 1 }}>
            <WebView style={{
                flex: 1,
            }} source={{ uri: 'https://www.sharing.amcrm.in/' }} ref={webview}
                javaScriptEnabled={true} startInLoadingState allowsInlineMediaPlayback={false}
                onLoadStart={(event) => loadStart(event)} onLoadEnd={(event) => loadStop(event)} onShouldStartLoadWithRequest={interceptYoutubeApp} />
            {webviewState.isLoading && <ActivityIndicator style={{
                flex: 1,
                left: 0,
                right: 0,
                top: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                bottom: 0,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
            }
            } size="large" color="#0000ff" hidesWhenStopped={!webviewState.isLoading} />}
        </View>
    );
};
export default App;
