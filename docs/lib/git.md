# git 常见问题

1. .gitignore 不生效

首先检查.gitignore 文件中的配置是否正确，如果确认配置正确，可能是之前提交过所以 git 产生缓存。

```bash
git rm -r –-cached .
git add .
git commit -m "清空git缓存"
```
