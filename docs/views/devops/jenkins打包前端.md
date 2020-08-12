TARGET_NAME="GQWEBGIS"
TARGET_PATH="/usr/java/microserver/"
<!-- TODO:备份目录 -->
#time
TIME=`date +%F`
TIMES=`date +%T`
KONGGE="-"

# 打包后的文件名
# GZ_NAME=$TARGET_NAME$KONGGE$TIME$KONGGE${BUILD_NUMBER}
GZ_NAME=$TARGET_NAME$KONGGE$TIME$KONGGE$TIMES
cd ${WORKSPACE}

node -v
yarn -v
# 编译
yarn&yarn build

# 打包文件
# tar -zcvf $GZ_NAME.tar.gz $TARGET_NAME/
zip -r $GZ_NAME.zip ${WORKSPACE}/$TARGET_NAME
# copy打包文件到指定目录并备份
cp $GZ_NAME.zip $TARGET_PATH
# 删除部署地址打包文件夹
rm -rf $TARGET_PATH$TARGET_NAME
# 复制文件夹到部署地址
cp -r $TARGET_NAME $TARGET_PATH
# 解压到目标目录
# unzip -o $GZ_NAME.zip -d $TARGET_PATH
# 删除当前zip
# rm -rf $GZ_NAME.zip