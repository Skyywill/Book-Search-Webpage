function jsoncall (id, container1) {

    $.ajax({

        type:'get',
        url: 'https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:'+id,
        dataType: 'json',
        success: function (response) {

      //    $('#title').empty()
      //    $('#title').append('Loading...')
            let book = response['ISBN:'+ id];
            if (book){

                    let title;
                    let authorArray = [];
                    let publicArray = [];
                    let subjectText = '';
                    let photoUrl;
                    let informationUrl;

                    title = book.title;

                    if (book.authors) {

                        book.authors.forEach(function (author)

                        {
                            authorArray.push(author.name);
                        });
                    }

                    if (book.publishers) {
                        book.publishers.forEach(function (publisher)

                        {
                            publicArray.push(publisher.name);
                        });
                    }

                    if (book.subjects) {
                        book.subjects.forEach(function (subject)

                        {
                            subjectText += '<a class = "letter_font" href="' + subject.url + '"target="_blank">' + subject.name + '</a>&nbsp;';
                        });
                    }

                    if (book.cover.large) {
                        photoUrl = book.cover.large;
                    }

                    if (book.url) {
                        informationUrl = book.url;
                    }



             booklayout = $('<div class="mention fadeInUp">\n' +
                 '        <div class="content_mention ">\n' +
                 '          <a href="'+ informationUrl +'" target="_blank"><img src="'+ photoUrl + '" alt="" ></a>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h3>' + title +  '</h3> <h5 style="font-weight: normal"><span style="font-weight: bold"> Author:&nbsp;</span>' + authorArray + '</h5>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            </h2> <h5 style="font-weight: normal"><span style="font-weight: bold">Publisher:&nbsp;</span>' + publicArray +  '</h5>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <p><span style="font-weight: bold; font-size: 13px">Subjects:&nbsp;</span>'+subjectText+'</p>\n' +
                 '          </div>\n' +
                 '        </div>');
                container1.append(booklayout)
            }
      //      $('#title').empty()
      //      $('#title').append('List of Books')
        }
    })
}

function searchRequest() {

    let $orders = $('#orders');
    let keyword = $('#searchTab').val();
    $('#orders').empty()
    $('#title').empty()

    $.ajax({
        type: 'GET',
        url: 'https://reststop.randomhouse.com/resources/works/?start=0&max=100&expandLevel=1&search=' + keyword,
        dataType: 'xml',
        success: function (orders) {

            let findIsbn;
            if($(orders).find(':first-child').text) {

              console.log($(orders).find(':first-child').text);

                $(orders).find('work').each(function () {

                    findIsbn =  $(this).find('titles>:first-child').text();

                    if (findIsbn.valueOf()) {

                        console.log(findIsbn);
                        jsoncall(findIsbn, $orders);

                      }
                    })

                    $('#title').append(' <h2 class="book_title fadeInUp">List of Books</h2>')
                  }

                  if (!findIsbn) {

                    alert('No Book Is Found')
                    $('#title').empty()
                  }
               }
            })
    }
