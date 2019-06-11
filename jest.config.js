module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: 'src/__tests__/tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers|@react-navigation/.*)',
    ],
    setupFiles: ['./src/__mocks__/setup.js'],
};
