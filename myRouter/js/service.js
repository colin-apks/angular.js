/**
 * Created by pc on 2015/1/5.
 */
angular.module('myService',[])
    .factory('langsData',function(){
        return {
            "data": [{'name':"php","description":"phphphphphphphph"}
                ,{'name':"python","description":"pythonpythonpython"}
                ,{'name':"java","description":"javajavajava"}
                ,{'name':"javascript","description":"javascriptjavascript"}
            ]
        }
    })
    .factory("namesData",function(){
        return {
            "data":[{"role":"周","stars":3},{"role":"吴","stars":34},{"role":"郑","stars":234},{"role":"王","stars":543},{"role":"冯","stars":123},{"role":"周","stars":2345}]
        }
    })
    .factory("starData",function(){
        return {
            "data":[
                {'img':"images/demo1.jpg","words":"我们是共产主义接班人我们是共产主义接班人我们是共产主义接班人","header":"Angular"}
                ,{'img':"images/demo2.jpg","words":"demodemodemodemodemodemodemo","header":"Angular"}
                ,{'img':"images/demo3.jpg","words":"angularangularangularangular","header":"Angular"}
                ,{'img':"images/demo2.jpg","words":"demodemodemodemodemodemodemo","header":"Angular"}
            ]
        }
    })