<!-- Spatial_SQLServer -->
# SQLServer 空间字段操作sql

##
```sql

INSERT INTO SpatialTable (geom)  VALUES (geometry::STGeomFromText('POINT (20 180)', 4326));  

UPDATE pollDischarge SET pollDischarge.SHAPE=(geometry::STGeomFromText(pollDischarge.[Position],4326))

SELECT shape.STAsText() FROM Project
```