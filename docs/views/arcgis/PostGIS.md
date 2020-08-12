```sql
CREATE OR REPLACE FUNCTION "public"."_A_UpdateTownNames"()
  RETURNS "pg_catalog"."int4" AS $BODY$
	
DECLARE 
_i INTEGER;_number INTEGER;_geo geometry;
_names VARCHAR; _codes VARCHAR; 

BEGIN

-- dd_lines
_i:=1;
_number:=(SELECT COUNT(*)+1 FROM dd_lines);

WHILE _i<_number LOOP

_geo :=(SELECT geom FROM dd_lines WHERE objectid =_i);

_names:=(SELECT string_agg(t2.col,',') FROM (SELECT DISTINCT cityname col FROM dd_towns WHERE ST_Intersects(_geo,geom)) t2);
UPDATE dd_lines SET i_town_names= _names WHERE dd_lines.objectid=_i;

_codes:=(SELECT string_agg(t2.col,',') FROM (SELECT DISTINCT code col FROM dd_towns WHERE ST_Intersects(_geo,geom)) t2);
UPDATE dd_lines SET i_town_codes= _codes WHERE dd_lines.objectid=_i;

_i:=_i+1;
END LOOP;
	RETURN _i;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
```

```sql
CREATE OR REPLACE FUNCTION "public"."_A_UpdateTownNames"()
  RETURNS "pg_catalog"."int4" AS $BODY$
	
DECLARE 
_i INTEGER;_number INTEGER;_geo geometry;
_names VARCHAR; _codes VARCHAR; 

BEGIN

-- line_over_1000
_i:=1;
_number:=(SELECT COUNT(*)+1 FROM line_over_1000);

WHILE _i<_number LOOP

_geo :=(SELECT geom FROM line_over_1000 WHERE objectid =_i);

_names:=(SELECT string_agg(t2.col,',') FROM (SELECT DISTINCT cityname col FROM dd_towns WHERE ST_Intersects(_geo,geom)) t2);
UPDATE line_over_1000 SET i_town_names= _names WHERE line_over_1000.objectid=_i;

_codes:=(SELECT string_agg(t2.col,',') FROM (SELECT DISTINCT code col FROM dd_towns WHERE ST_Intersects(_geo,geom)) t2);
UPDATE line_over_1000 SET i_town_codes= _codes WHERE line_over_1000.objectid=_i;

_i:=_i+1;
END LOOP;
	RETURN _i;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
```