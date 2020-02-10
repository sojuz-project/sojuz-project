#!/bin/sh
show_menu(){
    normal=`echo "\033[m"`
    menu=`echo "\033[36m"` #Blue
    number=`echo "\033[33m"` #yellow
    bgred=`echo "\033[41m"`
    fgred=`echo "\033[31m"`
    printf "\n${menu}*********************************************${normal}\n"
    printf "${menu}**${number} 1)${menu} Projects list ${normal}\n"
    printf "${menu}**${number} 2)${menu} Export docker.local WP to projects DIR ${normal}\n"
    printf "${menu}**${number} 3)${menu} Import docker.local WP from projects DIR ${normal}\n"
    printf "${menu}**${number} 4)${menu} Reset local WP ${normal}\n"
    printf "${menu}**${number} 5)${menu} Remove project from projects DIR${normal}\n"
    printf "${menu}*********************************************${normal}\n"
    printf "Please enter a menu option and enter or ${fgred}x to exit. ${normal}"
    read opt
}

option_picked(){
    msgcolor=`echo "\033[01;31m"` # bold red
    normal=`echo "\033[00;00m"` # normal white
    message=${@:-"${normal}Error: No message passed"}
    printf "${msgcolor}${message}${normal}\n"
}

clear
show_menu
while [ $opt != '' ]
    do
    if [ $opt = '' ]; then
      exit;
    else
      case $opt in
        1) clear;
            option_picked "1) Projects list";
						sh mng.sh ls
            show_menu;
        ;;
        2) clear;
            option_picked "2) Export docker.local WP to projects DIR";
						echo "(save to archive)"
            echo "Insert project name:";
						read varname
						echo "Start export project: $varname"
            show_menu;
        ;;
        3) clear;
            option_picked "Option 3 Picked";
            printf "sudo service apache2 restart";
            show_menu;
        ;;
        4) clear;
            option_picked "Option 4 Picked";
            printf "ssh lmesser@ -p 2010";
            show_menu;
        ;;
        x)exit;
        ;;
        \n)exit;
        ;;
        *)clear;
            option_picked "Pick an option from the menu";
            show_menu;
        ;;
      esac
    fi
done