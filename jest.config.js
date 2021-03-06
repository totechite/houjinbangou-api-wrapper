module.exports = {
    "roots": [
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.(tsx|ts)?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
}