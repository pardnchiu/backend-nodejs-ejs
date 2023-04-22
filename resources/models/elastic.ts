// (()=>{
// 	const elasticsearch=require('elasticsearch');
// 	const elasticClient=new elasticsearch.Client({
// 		host:`${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
// 		log:'error'
// 	});
// 	elasticClient.ping({
// 		requestTimeout:30000
// 	},(err:Error)=>{
// 		if(err)throw err.message;
// 	});
// 	/**
// 	 * 插入資料庫
// 	 */
// 	exports.insert=(index:any,type:any,data:any)=>{
// 		let body:any[]=[];
// 		data.forEach((item:any)=>{
// 			body.push({
// 				index:{
// 					_index:index,
// 					_type	:type,
// 					_id		:item.sn
// 				}
// 			});
// 			body.push(item);
// 		});
// 		elasticClient.bulk({
// 			body:body
// 		}).then((r:any)=>{
// 			let count=0;
// 			r.items.forEach((item:any)=>{
// 				if (item.index && item.index.error)	console.log(++count,item.index.error);
// 			});
// 		}).catch((err:Error)=>{
// 			if(err)throw err.message;
// 		});
// 	};
// 	/**
// 	 * 搜尋資料庫
// 	 */
// 	exports.search=(index:any,body:any)=>{
// 		return elasticClient.search({
// 			index	:index,
// 			body	:body
// 		});
// 	};
// 	/**
// 	 * 更新資料庫
// 	 */
// 	exports.update=(index:any,id:any,body:any)=>{
// 		return elasticClient.update({
// 				index	:index,
// 				type	:'_doc',
// 				id		:id,
// 				body:{
// 					doc:body
// 				}
// 		}); 
// 	};
// })();