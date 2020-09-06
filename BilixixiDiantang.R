# bilixixi.cc
# @Re_空中三日
rm(list = ls())
library(dplyr)
library(tidyr)
library(stringr)
library(data.table)
library(ggplot2)


blackspace = as.character(scan("LittleBlackRoom.txt"))
blacklist = c("")

mydf = read.csv(grep("^DiantangTable .*?csv$",list.files(),value=T),header = F)

colnames(mydf) = c("link","title", "desc", "tags", "type", "lengthnum","viewnum","text", "share", "coin", "favor", "like","reply", "rank","upload","up","space")
table(mydf$rank)

mydf$titlelink = paste0("<a href='https://www.bilibili.com/video/",mydf$link,"' target='_blank'>",mydf$title,"</a>")
mydf$uplink = paste0("<a href='https://space.bilibili.com/",mydf$space,"' target='_blank'>",mydf$up,"</a>")

vie = mydf%>%filter(!up%in%blacklist)%>%filter(!space%in%blackspace)%>%filter(coin>=100)%>%arrange(-coin)
vie$upload = as.POSIXct(vie$upload, origin="1970-01-01")

rm(mydf)
vie = vie[,c("titlelink","lengthnum","viewnum","text","coin","upload","uplink","tags")]
#vie = vie[,c("titlelink","lengthnum","viewnum","text","coin","favor","share","like","reply","upload","uplink","tags","desc")]


