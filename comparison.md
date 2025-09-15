# Comparison

## count product by store ID
```
explain analyze select store_id, count(product_id) from product_v4 group  by store_id;
```

### Product V4
```sql
explain analyze select store_id, count(product_id) from product_v4 group  by store_id;
```

```bash
                                                                               QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..88388.34 rows=1449997 width=24) (actual time=0.348..379.752 rows=1450000 loops=1)
   Group Key: store_id
   ->  Index Only Scan using product_v4_store_id_product_id on product_v4  (cost=0.43..66638.38 rows=1449997 width=32) (actual time=0.335..129.136 rows=1450000 loops=1)
         Heap Fetches: 0
 Planning Time: 0.246 ms
 Execution Time: 416.559 ms
(6 rows)
```


### Product V7
```sql
explain analyze select store_id, count(product_id) from product_v7 group  by store_id;
```

```bash
                                                                               QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.42..62132.43 rows=1000000 width=24) (actual time=0.277..370.201 rows=1000000 loops=1)
   Group Key: store_id
   ->  Index Only Scan using product_v7_store_id_product_id on product_v7  (cost=0.42..47132.43 rows=1000000 width=32) (actual time=0.253..194.997 rows=1000000 loops=1)
         Heap Fetches: 0
 Planning Time: 0.871 ms
 Execution Time: 395.903 ms
(6 rows)
```

### Product Serial

```sql
explain analyze select store_id, count(product_id) from product_serial group  by store_id;
```

```bash
                                                     QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.42..56232.00 rows=538779 width=16) (actual time=0.268..279.388 rows=632386 loops=1)
   Group Key: store_id
   ->  Index Only Scan using product_serial_store_id_product_id on product_serial  (cost=0.42..45844.21 rows=1000000 width=16) (actual time=0.257..169.164 rows=1000000 loops=1)
         Heap Fetches: 140001
 Planning Time: 0.514 ms
 Execution Time: 294.287 ms
(6 rows)
```


## Get products by store_id
```sql
select * from product_ where store_id='';
```

### Product V4
```bash
            QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on product_v4  (cost=8386.77..65136.36 rows=99916 width=146) (actual time=27.051..123.329 rows=100399 loops=1)
   Recheck Cond: (store_id = 'e159ebaa-e8e1-4106-be62-348f800543a4'::uuid)
   Heap Blocks: exact=22023
   ->  Bitmap Index Scan on product_v4_store_id_product_id  (cost=0.00..8361.80 rows=99916 width=0) (actual time=22.827..22.828 rows=100399 loops=1)
         Index Cond: (store_id = 'e159ebaa-e8e1-4106-be62-348f800543a4'::uuid)
 Planning Time: 0.975 ms
 Execution Time: 126.128 ms
(7 rows)
```

### Product V7
```bash
                                                                     QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on product_v7  (cost=7291.46..52999.42 rows=101037 width=146) (actual time=29.201..186.912 rows=100486 loops=1)
   Recheck Cond: (store_id = 'adccfb01-7314-470d-8d86-7a8a1e3180b4'::uuid)
   Heap Blocks: exact=22045
   ->  Bitmap Index Scan on product_v7_store_id_product_id  (cost=0.00..7266.20 rows=101037 width=0) (actual time=25.424..25.424 rows=100486 loops=1)
         Index Cond: (store_id = 'adccfb01-7314-470d-8d86-7a8a1e3180b4'::uuid)
 Planning Time: 0.898 ms
 Execution Time: 189.479 ms
(7 rows)
```

### Product Serial
```bash
                                                                     QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on product_serial  (cost=4290.77..46363.17 rows=100432 width=130) (actual time=17.594..112.092 rows=100558 loops=1)
   Recheck Cond: (store_id = 6)
   Heap Blocks: exact=20292
   ->  Bitmap Index Scan on product_serial_store_id_product_id  (cost=0.00..4265.66 rows=100432 width=0) (actual time=13.376..13.376 rows=100558 loops=1)
         Index Cond: (store_id = 6)
 Planning Time: 1.327 ms
 Execution Time: 114.993 ms
(7 rows)
```