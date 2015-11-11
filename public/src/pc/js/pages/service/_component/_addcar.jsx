var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item');
var List = require('widgets/listView/list');
var api = require('pages/_common/api');
var pop = require('modules/pop/index');
var store = require('mixins/store');
var router = require('libs/router').router

var _addcar =[];
var pn;
var vs;

var esti2 = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index addcar'}>
                <header>
                    添加车辆
                </header>
                <article>
                    <div id="brand" className={'carform'}></div>
                    <div id="series" className={'carform'}></div>
                    <div id="model" className={'carform'}></div>
                    <div id="license" className={'carform'}></div>
                    <div id="number" className={'carform'}></div>
                    <div id="vin" className={'carform'}></div>
                    <div id="engin" className={'carform'}></div>
                </article>
                <footer>
                    <a id="now_addcar" className={'btn-link'}>添加车辆</a>
                </footer>
            </div>
        )
    }
}

//品牌
function dealWith_Data_Brand(){
    var nav = [];
    var resaults = []
    var rtnDom;

    SA.setter('Pop',{data:{display:'block'}})
    api.req('queryallbrand',{}, function(data){
      console.log(data);
        if(data.code && data.code===1){
        //   console.log(data);
            var tmp = {};
            data.results.map(function(item, i){
              var key = item.carfirstname;
              if(!tmp[key])
                tmp[key]=[];

              tmp[key].push(
                item.carbrand
              )
            })
            nav = Object.keys(tmp);
            if(nav.length){
                nav.map(function(item, i){
                   var tmp_foot = [];
                   tmp[item].map(function(unit, j){
                     tmp_foot.push({
                       attr: 'select',
                       k: unit,
                       v: unit
                     })
                   })
                    resaults.push(
                        {
                            body: item,
                            footer: tmp_foot
                        }
                    )
                })
            rtnDom = <List data={resaults}  listClass={'car_linkage'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
        }
      }
    })
    return rtnDom;
}
//车系
function dealWith_Data_Series(){
    var results = []
    var rtnDom;
    var nav = [];
    // _car.model.empty();
    pn = { carbrand: $("#brand").find("input").val()}
    SA.setter('Pop',{data:{display:'block'}})
    api.req('queryseries',pn, function(data){
      if(data.code && data.code===1){
        var tmp = [];
        data.results.map(function(item,i){
            var key = item.carseries;
            if(!tmp[key])
              tmp[key]=[];
        })
        nav = Object.keys(tmp);
        if(nav.length){
            nav.map(function(item, i){
                results.push(
                    {
                        footer: {
                          attr: 'select',
                          k: item,
                          v: item
                        }
                    }
                )
            })
            rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
        }
      }
    })
    return rtnDom;
}
//型号
function dealWith_Data_Type(){
    var results = []
    var rtnDom;
    var nav = [];
    cs = { carTypes: $("#series").find("input").val()}
    SA.setter('Pop',{data:{display:'block'}})
    api.req('querycartype',cs, function(data){
      if(data.code && data.code===1){
        data.results.map(function(item,i){

            results.push({
                footer:{
                    attr: 'select',
                    k: item.cartype,
                    v: item.carid
                }
            })
        })
        rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>
        SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
      }
    })
    return rtnDom;
}

var _car = {};
var bindEsti = function(){
    router.clear()
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');

    //品牌
    var sss = <em style={{color:'red',marginRight:'0.3rem'}}>*</em>;
    _car.brand = new Select({label:'品牌', popclose: true, star: sss}, 'brand',function(){
        $(this).click(function(){
          dealWith_Data_Brand();
        })
    });

    _car.brand.selected = function(txt,val){
        if(this.text !== txt){
            _car.model.empty();
            _car.series.empty();
        }
    }

    //车系
    _car.series = new Select({label:'车系', popclose: true, star: sss}, 'series',function(){
        $(this).click(function(){
          if($("#brand").find("input").val())
            dealWith_Data_Series();
          else
            SA.setter('Pop',{data:{body:'请先选择品牌', display:'block'}})
        })
    });

    _car.series.selected = function(txt,val){
        if(this.text !== txt){
            _car.model.empty();
        }
    }

    //型号
    _car.model = new Select({label:'车型', popclose: true, star: sss}, 'model',function(){
        $(this).click(function(){
          if($("#series").find("input").val())
            dealWith_Data_Type();
          else
            SA.setter('Pop',{data:{body:'请先选择车系', display:'block'}})
        })
    });

    //上牌时间
    _car.reg = new Text({label:'上牌时间'}, 'license',function(){

    });

    //车牌号
    _car.number = new Text({label:'车牌号'}, 'number',function(){

    });

    //VIN
    _car.vin = new Text({label:'VIN'},'vin',function(){

    });

    //发动机号
    _car.engin = new Text({label:'发动机号'},'engin',function(){

    });

    $('#now_addcar').click(function(){
        checkValue()
    })
}
var uuu = [];
var allSelect;

function checkValue(ele){
    var xxx = [];
    $("article .select").find("input").each(function(i,item){
        if(item.value&&item.value!==''){
          xxx.push(
            item.value
          )
        }
    })
    if(xxx.length===3){
      $('article div').each(function(){
          if(this.id){
            uuu.push({
                body: {
                  k: $(this).find('input').val(),
                  v: $(this).find('input').attr('name')
                }
            })
          }
      });

      //form 提交数据
      uuu.form = {
          carid : _car.model.value,
          carbrand: _car.brand.value,
          carseries: _car.series.value,
          cartype: _car.model.text,
          carengno: _car.engin.value||'',
          plateno: _car.number.value||'',
          carvin: _car.vin.value||'',
          regtime: _car.reg.value||''
      }

      SA.setter('_GLOBAL',{index: uuu})
      var local_user = SA.getter('_LOCAL_USER')
      console.log(local_user);
      if(local_user && local_user.data){
          var local_data = local_user.data;
          if(local_data && !local_data.error){
              local_data.usercar = [uuu.form]
              SA.setter('_LOCAL_USER', local_data);
          }else{
              SA.setter('_LOCAL_USER',{usercar: [uuu.form]})
          }
      }else{
          SA.setter('_LOCAL_USER',{usercar: [uuu.form]})
      }
      router.goback()
    }
    else {
      SA.setter('Pop',{data:{body:'品牌、车系、车型为必选项目，请选择！', display:'block'}})
    }
}
var Esti = React.createClass(esti2)
function renderDom(ele, cb){
    var element;
    if(typeof ele==='string')
        element = document.getElementById(ele)
    else
        if(typeof ele === 'object')
            if(ele.nodeType)
                element = ele
    else
        return;

// console.log(addCarData);
    React.render(
        <Esti itemDefaultMethod={bindEsti} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
