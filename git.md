### git笔记

#### 查看远程分支
```
git branch -r 
```
```
git branch -a
```

#### 如果发现查看的远程分支和git仓库里面的远程分支不同步，需要拉取远程所有分支
```
git fetch
```

#### 在远程分支下面建立一个自己的分支
```
git checkout -b p_#43_sjHaitouActive_yl  origin/p_#43_sjHaitouActive
```

#### 查看本地分支和远程分支的关系
```
git branch -vv
```
* 本地分支和远程分支没有建立关系，因为它是在本地分支上切的分支`git checkout -b yl master`

* 执行命令`git branch -vv`显示下面信息

 `
yl                      3eebad3 Merge branch 'p_#38_znql' into 'master'
`

* 执行`git pull`和`git push `会不成功，因为远程没有相应的分支

```
➜  ***** git:(yl) git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> yl

➜  **** git:(yl) git push
fatal: The current branch yl has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin yl

```

* 本地分支和远程分支建立了关系

* 执行命令`git branch -vv`显示下面信息

`
 yl [origin/yl] Delete common2.0
`

#### 本地分支和远程分支建立关联

* 如果远程存在该分支dev-0727,建立和远程分支的关联

```
git branch -u origin/dev-0727
```
或者

```
git branch --set-upstream-to origin/dev-0727
```

```
➜  git-practice git:(dev-0727) git branch -u origin/dev-0727
Branch 'dev-0727' set up to track remote branch 'dev-0727' from 'origin'.

```

* 执行`git branch -vv` 

  显示 `* dev-0727 9151aef [origin/dev-0727] 修改`

* 如果远程没有本地分支dev-0727的存在，需要将分支推向远程,远程仓库才会有此分支

```
git push --set-upstream origin dev-0727
```

#### 解除本地分支和远程分支的关联
```
git branch --unset-upstream
```

* 本地分支和远程分支只有具有相同的名字的时候才会建立关联吗？答案是否定的！！！！！

```
➜  git-practice git:(dev-0727) git branch --set-upstream-to origin/dev-2
Branch 'dev-0727' set up to track remote branch 'dev-2' from 'origin'.
➜  git-practice git:(dev-0727) git branch -vv
* dev-0727 9151aef [origin/dev-2: ahead 6] 修改

```
* git push 不可以，需要自己指定特定分支

```
➜  git-practice git:(dev-0727) git push
fatal: The upstream branch of your current branch does not match
the name of your current branch.  To push to the upstream branch
on the remote, use

    git push origin HEAD:dev-2

To push to the branch of the same name on the remote, use

    git push origin dev-0727

To choose either option permanently, see push.default in 'git help config'.
```
#### 修改了本地代码，但是不想提交，又拉取线上的master分支，进行合并，可以使用stash进行操作
* 把文件放到暂存区（ps：添加-u会把新增的文件也放入暂存区，不添加-u只会把修改的文件放入暂存区）

```
git stash -u
```
* 然后 `git status`发现本地没有任何改变
* `git checkout master`
* `git pull origin master`
* `git checkout dev`
* `git merge master`
* `git stash pop`
* 这个时候有冲突的话需要处理冲突

#### merge合并的话是把本地所有的文件进行合并，但是只想合并别人的一个文件怎么办？
```
git checkout p_#3  src/components/Sidebar/_sidebar.vue

```
ps:这种其实也不叫合并，最直接的叫法叫强制覆盖我的分支文件，这个是把p_#3分支上面的src/components/Sidebar/_sidebar.vue强行覆盖了我的分支的该文件。

#### 修改分支名称
```
git branch -m dev-0820 p_#5
```
* git branch 旧分支名称 新分支名称









