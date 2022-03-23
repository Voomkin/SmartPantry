import * as React from 'react';
import { View } from 'react-native';
import { Interactable } from 'react-native-redash';
import { DangerZone } from 'expo';

const { Animated } = DangerZone;
const { Value } = Animated;

interface CursorProps {
    x: typeof Value;
    count: number;
    size: number;
}

export default class Cursor extends React.PureComponent<CursorProps> {
    render() {
        const {x, count, size} = this.props;
        const snapPoints = new Array(count).fill(0).map((e, i) => ({ x: i * size}));
        return (
            <Interactable animatedValueX={x} {...{snapPoints}} horizontalOnly>
                <Animated.View 
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: "white",
                        borderWidth: "##f1f2f6",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,

                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,


                    }}
                />
            </Interactable>
        )
    }
}