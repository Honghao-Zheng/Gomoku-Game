dataDirectory='C:/Users/Jason/Desktop/hxz157/gomoku/src/Testing/dataGenerated'


GA1_Minimax1_game_performance=paste(dataDirectory,
                                    'GA1_Minimax1_game_performance.csv',
                                    sep="/")

Minimax4_GA1_game_performance=paste(dataDirectory,
                                    'Minimax4_GA1_game_performance.csv',
                                    sep="/")

data1<-read.csv(
  file=GA1_Minimax1_game_performance
  , header=TRUE,sep=",")

data2<-read.csv(
  file=Minimax4_GA1_game_performance
  , header=TRUE,sep=",")

minimax1P=data1[,2]
minimax4P=data2[,1]
t.test(minimax1P,minimax4P,
            alternative = "two.sided",
            pair=FALSE,conf.level = 0.95, na.rm = TRUE)

binom.test(43, 71, p = 0.5,
           alternative = "greater",
           conf.level = 0.95)
binom.test(160, 259, p = 0.5,
           alternative = "two.sided",
           conf.level = 0.95)

binom.test(216, 216+136, p = 0.5,
           alternative = "two.sided",
           conf.level = 0.95)
binom.test(110,200,p = 0.5,
           alternative = c("two.sided", "less", "greater"),
           conf.level = 0.95)