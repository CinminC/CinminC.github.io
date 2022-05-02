// JavaScript Document
$(document).ready(function () {


    // $(window).on('load resize', function () {
    //     var windowsize = document.body.clientWidth;
    //     if (windowsize > 768) {
    //         $("header").load("topNav.html");
    //     } else {
    //         $("header").load("topNav_mobile.html");
    //     }
    // });

    $(".ajaxNav").load("nav.html");
    $("footer").load("footer.html");
    $(".topNav_mobile").hide();
    $(".menu").click(function () {
        $(".topNav_mobile").slideToggle();
    });
    //get data of certain pages(use switch for 2 function)
    selectcon('js/list.json', 0);
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var IntId = parseInt(id);
    if (IntId != null) {
        selectcon('js/list.json', IntId);
    }

    $("workSection").css({ "display": "none" }).fadeIn(2000);
});



function selectcon(filename, id) {
    $.getJSON(filename, function (data) {
        $(".workSection").empty();   //清空section

        $.each(data, function (index, en) {

            var html = '<div class="box" data-aos="fade-up" data-aos-anchor-placement="top-center">';
            html += '<div class="imgbox">';
            html += '<a href="' + en['link'] + '">';
            html += '<img src="' + en['image'] + '">';
            html += '<div class="fadebox">';
            html += '<p>' + en['intro'] + '</p>';
            html += '</div>';
            html += '</a>';
            html += '</div>';
            html += '<h1>' + en['work'] + '</h3>';
            html += '<p>' + en['type'] + '</p>';
            html += '</div>';

            switch (id) {
                case 0:
                    $(".workSection").append(html);
                    break;
                case 1:
                    if (en['category'] == "generative") {
                        $(".workSection").append(html);
                    }
                    break;
                case 2:
                    if (en['category'] == "ux") {
                        $(".workSection").append(html);
                    }
                    break;
                case 3:
                    if (en['category'] == "product") {
                        $(".workSection").append(html);
                    }
                    break;

                default:
                    $(".workSection").append(html);
                    break;
            }

        });
    });
    return false;   //停止JS處理程序
}




