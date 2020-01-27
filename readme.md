## install mariadb
```$xslt
https://www.cnblogs.com/jianxuanbing/archive/2018/04/02/8693157.html
```
root password: kalix@123

192.119.116.101

``` 
# mysql -u root -p
MariaDB [(none)]> 
grant all privileges on *.* to root@'%' identified by '123' with grant option;
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> 
flush privileges;
Query OK, 0 rows affected (0.01 sec)
```

### example refer
https://www.js-tutorials.com/nodejs-tutorial/node-js-restify-example-using-mysql/#
https://github.com/ThorstenHans/restify-headstart

### latest record
```
   SELECT *, ABS(NOW() - create_time) AS diffTime
   FROM employee
   ORDER BY diffTime ASC limit 1
```

### change 
``` 
https://blog.csdn.net/zhengchaooo/article/details/79500032
```

### change timezone on mysql
https://blog.csdn.net/ZYC88888/article/details/86597674
``` 
修改时区

set global time_zone = '+8:00';  ##修改mysql全局时区为北京时间，即我们所在的东8区
set time_zone = '+8:00';  ##修改当前会话时区
flush privileges;  #立即生效
```

### mongodb install

https://tecadmin.net/install-mongodb-on-centos/
