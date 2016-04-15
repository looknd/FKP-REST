/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
var libs = require('libs/libs')
var List = require('widgets/listView/list')
var scrollMixins = require('mixins/scrollLoadAndLazy');
var itemMixins = require('mixins/item')
var Store = require('mixins/store');
var _ = libs.lodash;

var tmpApp = {
	mixins:[ scrollMixins],
	getDefaultProps: function() {
		return {

		};
	},

	getInitialState: function() {
		return {
        	data: []
	    };
	},

	//插入真实 DOM之前
	componentWillMount:function(){
		if(this.props.data){
			var tmpPropsData = libs.clone(this.props.data);
			this.setState({
				data: tmpPropsData
			})
		}
		if (this.props.scroll==='self'){
			this.scrollContainer = 'load-list'
		}
	},

	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){},

	loopRender: function(){
		var tData = this.state.data;
		// tData.push({title: '加载更多内容', 'itemClass': 'loadbar', itemStyle:{"display":'none'}});
		tData.push(<div ref="loadbar" className="loadbar" style={{"display":"none"}}>加载更多内容</div>);
		return <List {...this.props} data={tData}/>
	},

	componentDidMount: function () {},

	render: function () {
		var fills = this.loopRender(),
			_sty = {}
		if (this.props.scroll==='self'){
			_sty = {height: '100%', overflow: 'auto'}
		}
		return (
			<div ref="load-list" className='load-list' style={_sty}>
				{fills}
			</div>
		)
	}
};

// module.exports = tmpApp;

function actRct( storeName ){
    var _storeName = storeName||'LDL',
        _rct = _.cloneDeep(tmpApp);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
