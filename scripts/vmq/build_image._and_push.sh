#!/bin/bash
###
 # @Author: Daoji daoji.chang@gmail.com
 # @Date: 2024-10-17 15:41:00
 # @LastEditors: Daoji daoji.chang@gmail.com
 # @LastEditTime: 2024-11-21 15:54:55
 # @FilePath: /fut-frontend/command/build_prod_push_image.sh
 # @Description: 构建并推送镜像
###

# 显示帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo "选项:"
    echo "  --help     显示帮助信息"
    echo "  --arm      构建 ARM64 架构镜像"
    echo "  --x86      构建 AMD64 架构镜像 (默认)"
    echo "  --both     同时构建 ARM64 和 AMD64 架构镜像"
    echo
    echo "示例:"
    echo "  $0 --arm   # 构建 ARM64 镜像"
    echo "  $0 --both  # 构建多架构镜像"
}

# 获取版本号
TAG=$(source apps/web-antd/.env && echo "$VERSION")
IMAGE_NAME="daoji/vmq-fastapi-frontend:$TAG"

# 默认平台为 linux/amd64
PLATFORM="linux/amd64"

# 解析命令行参数
while [[ $# -gt 0 ]]; do
  case $1 in
    --help)
      show_help
      exit 0
      ;;
    --arm)
      PLATFORM="linux/arm64"
      shift
      ;;
    --x86)
      PLATFORM="linux/amd64"
      shift
      ;;
    --both)
      PLATFORM="linux/amd64,linux/arm64"
      shift
      ;;
    *)
      echo "错误: 未知参数 $1"
      echo "使用 --help 查看帮助信息"
      exit 1
      ;;
  esac
done

echo "开始构建镜像..."
echo "目标平台: $PLATFORM"
echo "镜像标签: $IMAGE_NAME"

docker buildx build \
  --platform $PLATFORM \
  -f scripts/vmq/Dockerfile \
  --push -t $IMAGE_NAME .

if [ $? -eq 0 ]; then
    echo "✅ 镜像构建并推送成功！"
    echo "镜像信息: $IMAGE_NAME"
else
    echo "❌ 镜像构建或推送失败！"
    exit 1
fi
