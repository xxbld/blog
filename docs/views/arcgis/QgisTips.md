# Qgis 加载各种数据图层的Tips

## 1. QGIS 无法加载geom字段混合各种几何类型的表

### 即geom字段同时存在：POINT,POLYLINE,POLYGON 等
### sqlserver 可以同时存在；postgis 不可以同时存在，单geometrycollection 也无法加载

```sql
#解决思路：通过视图加载，但是无法进行编辑
#视图加载也存在问题，qgis加载图层需要指定一个主键，然并没有；
#QGIS选择主键的功能好像不太行（3.0），不过QGIS会猜哪个是主键,所以创建一个带objectid的视图

#sqlserver 示例
CREATE OR REPLACE VIEW1 AS
SELECT ROW_NUMBER() over(order by t1.GUID) as OBJECTID, t1.XXX FROM aaa t1 WHERE XXXX;
```