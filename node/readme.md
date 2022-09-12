- tạo file class.json lưu trữ url, các thẻ và class
- tạo một file trong controllers để lấy nội dung về bằng cách duyệt file class.json  
- tạo một file json trong phần cache để làm bộ nhớ đệm
- tienphong.,dantri,vnexpresss 




---------------------------------------------
trong file json theo thứ tự có ba tầng thẻ:
    -first: thẻ chứa các bài viết
        - sd: thẻ chứa các phần: thumb,title,description(nếu có),thể loại (nếu có)
            -rd:
                +thumb: lấy thuộc tính data-src của thẻ rd-1
                +link: lấy thuộc tính href của thẻ rd-2
                +title: lấy text() của thẻ rd-2
                +desc: lấy text() của thẻ rd-3 (nếu có)
                +thể loại: lấy text() của thẻ rd-4  (nếu có)