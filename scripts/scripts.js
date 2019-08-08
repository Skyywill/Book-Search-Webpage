function jsoncall (id, container1) {

    $.ajax({
        type:'get',
        url: 'https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:'+id,
        dataType: 'json',
        success: function (response) {

            $('#title').empty()
            $('#title').append('Loading...')
            let book = response['ISBN:'+ id];
            if (book){

                    let title;
                    let auth = [];
                    let publi = [];
                    let subje = '';
                    let picUrl;
                    let infoUrl;

                    title = book.title;

                    if (book.authors) {

                        book.authors.forEach(function (author)

                        {
                            auth.push(author.name);
                        });
                    }

                    if (book.publishers) {
                        book.publishers.forEach(function (publisher)

                        {
                            publi.push(publisher.name);
                        });
                    }

                    if (book.subjects) {
                        book.subjects.forEach(function (subject)

                        {
                            subje += '<a class = "letter_font" href="' + subject.url + '"target="_blank">' + subject.name + '</a>&nbsp;';
                        });
                    }

                    if (book.cover.large) {
                        picUrl = book.cover.large;
                    }

                    if (book.url) {
                        infoUrl = book.url;
                    }



             bookformat = $('<div class="mention fadeInUp">\n' +
                 '        <div class="content_mention ">\n' +
                 '          <a href="'+ infoUrl +'" target="_blank"><img src="'+ picUrl + '" alt="" ></a>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h3>' + title +  '</h3>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h4>Author:&nbsp;' + auth +  '</h4>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h4>Publisher:&nbsp;' + publi +  '</h4>\n' +
                 '          </div>\n' +
                 '            <p>'+subje+'</p>\n' +
                 '          </div>\n' +
                 '        </div>');
                container1.append(bookformat)
            }
            $('#title').empty()
            $('#title').append('List of Books')
        }
    })
}

function searchRequest() {

    let $orders = $('#orders');
    let keyword = $('#searchTab').val();
    $('#orders').empty()

    $.ajax({
        type: 'GET',
        url: 'https://reststop.randomhouse.com/resources/works/?start=0&max=100&expandLevel=1&search=' + keyword,
        dataType: 'xml',
        success: function (orders) {
            let sIsbn;
                $(orders).find('work').each(function () {
                    sIsbn =  $(this).find('titles>:first-child').text();
                        console.log(sIsbn);
                        jsoncall(sIsbn, $orders);
                    })
                  }
            })
    }
