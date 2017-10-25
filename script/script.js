$(window).on('scroll', function () {

    var headerHeight = $('.header').outerHeight();
    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    if (scrollTop > (headerHeight)) {
        console.log("jojo");
        $('.search-block--parag').hide('fast', 'swing')
    }
    if (scrollTop <= (headerHeight)) {
        $('.search-block--parag').show('fast', 'swing')
    }
});


function getBooks(e) {
    e.preventDefault();
    var alert = $('#alert');
    var item = $('#usersInput').val();
    var resultsBox = $('#results');
    alert.empty();
    resultsBox.empty();

    if (item === '') {
        alert.append('Będzie łatwiej znaleźć, kiedy coś tu wpiszesz <img src="assets/pencil.svg"> :)').show('fast', 'swing');
    } else {
        $('.decoration-block').toggleClass('decoration-block__bg');
        alert.hide('fast', 'swing');

        $.ajax({
            url: 'https://gwo.pl/booksApi/v1/search?query=' + item,
            dataType: 'json',
            type: 'GET',
            data: {},
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    for (val in data) {
                        resultsBox.append(
                            '<div class="card book"><div class="card-header book--subject">'
                            + data[val].subject +
                            '</div><div class="card-body"><img class="img-responsive center-block" src="'
                            + data[val].cover + '"><div class="book--info">' +
                            '<div class="book--info__title"><h3 class="card-title">'
                            + data[val].title + '</h3><h4 class="card-title book--info__author">'
                            + data[val].author + '</h4><div class="book--info__levels">'
                            + data[val].levels[0].school + '</div></div><a target="_blank" href="'
                            + data[val].url+' " class="btn btn-primary book--link">Do księgarni ' +
                            '<img class="book--link--img" src="assets/book.svg" alt="shop online"></a></div>');
                    }
                } else {
                    alert.append('Nie mamy tego w naszej bazie. Spróbuj inne hasło').show('fast', 'swing');
                }
            },
            error: function (data) {
                console.log("error!" + data);
            }
        })
    }
}

$('#search').on('click', getBooks);
