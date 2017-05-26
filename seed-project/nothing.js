/**
 * Created by supeng on 2017/5/25.
 */
var mySingleton = (function () {

// Instance 存储一个单例实例的引用
    var instance;

    function init() {

// Singleton

// 私有的方法和变量
        function privateMethod(){
            console.log( "I am private" );
        }

        var privateVariable = "Im also private";

        return {

            // 共有的方法和变量
            publicMethod: function () {
                console.log( "The public can see me!" );
            },

            publicProperty: "I am also public"
        };

    };

    return {

// 如果实例不存在，那么创建一个
        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA,singleB); // tru
console.log( singleA ===singleB); // true