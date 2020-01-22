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
