declare module 'react-native-progress-steps' {
    import React from 'react';
    import { ViewStyle, TextStyle } from 'react-native';

    export interface ProgressStepsProps {
        activeStep?: number;
        borderWidth?: number;
        completedStepIconColor?: string;
        activeStepIconBorderColor?: string;
        activeLabelColor?: string;
        disabledStepNumColor?: string;
        disabledStepIconColor?: string;
        completedProgressBarColor?: string;
        activeStepNumColor?: string;
        activeStepIconColor?: string;
        progressBarColor?: string;
        topOffset?: number;
        marginBottom?: number;
        marginTop?: number;
        labelFontSize?: number;
        style?: ViewStyle;
    }

    export interface ProgressStepProps {
        onNext?: () => void;
        onPrevious?: () => void;
        onSubmit?: () => void;
        nextBtnText?: string;
        previousBtnText?: string;
        finishBtnText?: string;
        nextBtnStyle?: ViewStyle;
        previousBtnStyle?: ViewStyle;
        finishBtnStyle?: ViewStyle;
        nextBtnTextStyle?: TextStyle;
        previousBtnTextStyle?: TextStyle;
        finishBtnTextStyle?: TextStyle;
        scrollViewProps?: any;
        viewProps?: any;
        removeBtnRow?: boolean;
    }

    export class ProgressSteps extends React.Component<ProgressStepsProps, any> {}
    export class ProgressStep extends React.Component<ProgressStepProps, any> {}
}
