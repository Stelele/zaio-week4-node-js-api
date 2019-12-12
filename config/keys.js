module.exports = {
    mongodb: {
        connectionString: 'mongodb+srv://test:test@todo-9zzzh.mongodb.net/test?retryWrites=true&w=majority'
    }, 
    session: {
        cookieKey: 'theantwoeialgknaoweighdmsgoahgodklmasgoireghiamjglknogaewrgkmasdlkhjuaijginewahgijorokm468290341u51kolm623i490'
    },
    google: {
        clientID: '877294766464-r03e4no9l9v7g97p4tgms3447m1tgdfp.apps.googleusercontent.com',
        clientSecret: '1Jbhp63mO_ryNRWNh3DUx4m0',
        callbackURL: '/auth/google/redirect'
    },
    facebook: {
        clientID: '713794812479285',
        clientSecret: '9ded447e66a6c760c25f1ca277a46db1',
        callbackURL: '/auth/facebook/redirect'
    }
}