# bilixixi.cc
# @Re_空中三日

library(dplyr)
library(tidyr)
library(stringr)
library(data.table)

lastup = grep("^Bilixixi.*?csv$",list.files("docs/"),value=T)[1]
lastdate = str_extract(lastup,"20[0-9]{2}-[0-9]{2}-[0-9]{2}")

blackspace = as.character(scan("LittleBlackRoom.txt"))
blacklist = c("")

mydf = read.csv(paste0("docs/",lastup),header = T)

mydf$viewnum = ifelse(grepl("万",mydf$view),
                      as.numeric(gsub("万", "", mydf$view))*10000,
                      as.numeric(as.character(mydf$view)))

mydf$length = ifelse(grepl(":[0-9]{1,2}:",as.character(mydf$length)),
                     as.character(mydf$length),
                     paste0("00:",as.character(mydf$length)))

mydf$titlelink = paste0("<a href='https://www.bilibili.com/video/",mydf$link,"' target='_blank'>",mydf$title,"</a>")

mydf$uplink = paste0("<a href='https://space.bilibili.com/",mydf$space,"' target='_blank'>",mydf$up,"</a>")

vie = mydf%>%filter(!up%in%blacklist)%>%filter(!space%in%blackspace)%>%arrange(-viewnum)
vie$upload = as.Date(vie$upload)

vie$lengthnum = lubridate::seconds(lubridate::hms(vie$length))


list = c("飞云系|陈飞宇|飞鱼","奥利奥|吴磊|双[Ll][Ee][Oo]","雷雨云","陈瑶","热巴","朱一龙|火锅夫夫|井然","刘亦菲","旭润|邓伦|旭凤|润旭","白鹿","成毅|司凤","杨幂","陈星旭","王一博","肖战","赵丽颖","陈钰琪|透芝|重雪芝","李洙赫","张若昀","白敬亭","许凯","赵露思","丁禹兮","群像|全员","混剪","吴亦凡","杨超越","杨洋","刘诗诗","刘昊然","宋茜","袁冰妍","张彬彬","刘学义","郑业成","杜雨宸|邝露","鹿晗","万茜","黄晓明","彭小苒","吴倩|赵默笙","杨紫|佟年","李沁","王楚然","谭松韵","林雨申","徐正溪","任嘉伦","李易峰","贾玲","郭麒麟")
sapply(list,function(x){sum(grepl(x,vie$title))})
vie$tag = grepl(paste(list,collapse = "|"),vie$title)
vie$tag = ifelse(grepl("cp|拉郎",vie$title),T,vie$tag)
vie$tag = ifelse(grepl("个人向|水仙|单人",vie$title),F,vie$tag)

vie = vie[,c("titlelink","lengthnum","viewnum","text","upload","uplink","title","tag")]
