declare module '*.svg' {
    import {SvgProps} from 'react-native-svg';
    // eslint-disable-next-line
    const content: React.ComponentClass<SvgProps, any>;
    export default content;
}
