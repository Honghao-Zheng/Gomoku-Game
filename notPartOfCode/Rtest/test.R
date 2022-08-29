dataDirectory='C:/Users/Jason/Desktop/hxz157/gomoku/src/Testing/dataGenerated'

//depth2
MinimaxNR_MinimaxML_move_time=paste(dataDirectory,
                                    'MinimaxNR_MinimaxML_move_time.csv',
                                    sep="/")
data1<-read.csv(
  file=MinimaxNR_MinimaxML_move_time
  , header=TRUE,sep=",")

MinimaxNR=data1[,1]
MinimaxML=data1[,2]
wilcox.test(MinimaxNR,MinimaxML,
            alternative = "two.sided",
            pair=FALSE,conf.level = 0.95, na.rm = TRUE)
t.test(MinimaxNR,MinimaxML,
            alternative = "two.sided",
            pair=FALSE,conf.level = 0.95, na.rm = TRUE)



//depth4
MinimaxAB_MinimaxML_move_time=paste(dataDirectory,
                                    'MinimaxAB_MinimaxML_move_time.csv',
                                    sep="/")
data2<-read.csv(
  file=MinimaxAB_MinimaxML_move_time
  , header=TRUE,sep=",")

MinimaxAB=data2[,1]
MinimaxML=data2[,2]
wilcox.test(MinimaxAB,MinimaxML,
            alternative = "two.sided",
            pair=FALSE,conf.level = 0.95, na.rm = TRUE)
t.test(MinimaxAB,MinimaxML,
       alternative = "two.sided",
       pair=FALSE,conf.level = 0.95, na.rm = TRUE)


//depth4
MinimaxAB_Minimax_move_time=paste(dataDirectory,
                                    'MinimaxAB_Minimax_move_time.csv',
                                    sep="/")
data3<-read.csv(
  file=MinimaxAB_Minimax_move_time
  , header=TRUE,sep=",")

MinimaxAB=data3[,1]
Minimax=data3[,2]
wilcox.test(MinimaxAB,Minimax,
            alternative = "two.sided",
            pair=FALSE,conf.level = 0.95, na.rm = TRUE)
t.test(MinimaxAB,Minimax,
       alternative = "two.sided",
       pair=FALSE,conf.level = 0.95, na.rm = TRUE)


//minimax 4 vs 1
binom.test(43, 71, p = 0.5,
           alternative = "greater",
           conf.level = 0.95)
binom.test(160, 259, p = 0.5,
           alternative = "two.sided",
           conf.level = 0.95)
//genetic 4 vs 1
binom.test(216, 216+136, p = 0.5,
           alternative = "two.sided",
           conf.level = 0.95)

//genetic 2 vs 1
binom.test(187, 187+148, p = 0.5,
           alternative = "greater",
           conf.level = 0.95)
//genetic 4 vs 2
binom.test(188, 187+162, p = 0.5,
           alternative = "greater",
           conf.level = 0.95)

