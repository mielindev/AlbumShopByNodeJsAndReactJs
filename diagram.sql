Table users {
    id          int [pk, increment]  
    name        varchar(100) [not null]  
    email       varchar(150) [unique, not null]  
    password    varchar(255) [not null]  
    role        int [default: 0, note: "1. User, 2. Admin"]  
    phone       varchar(20)  
    address     text  
    avatar      varchar(255)  
    is_locked   int [default: 1, note: "1. active, 0. inactive"] 
    created_at  datetime
    updated_at  datetime 
}

Table products {
    id            int [pk, increment]  
    name          varchar(150) [not null]  
    artist_id     int [not null]
    label_id      int [not null]
    release_date  date   
    description   text  
    image         varchar(255)  
    active        int [default: 1, note: "1. active, 0. inactive"] 
    created_at    datetime  
    updated_at    datetime  
}

Table format_details {
  id            int [pk, increment]
  format_id     int [not null]
  product_id    int [not null]
  price         int
  old_price     int
  stock         int [default: 0]
  created_at    datetime
  updated_at    datetime
}

Ref: products.id < format_details.product_id
Ref: artists.id < products.artist_id
Ref: formats.id < format_details.format_id
Ref: labels.id < products.label_id
Ref: products.id < genre_details.product_id

Table artists {
    id           int [pk, increment]  
    name         varchar(100) [not null]
    image        text
    bio          text   
    created_at   datetime  
    updated_at   datetime  
}

Table genres {
    id            int [pk, increment]  
    name          varchar(100) [not null]  
    description   text
    created_at    datetime
    updated_at    datetime
}

Table genre_details {
  id            int [pk, increment]
  genre_id      int
  product_id    int
  created_at    datetime
  updated_at    datetime
}
Ref: genres.id < genre_details.genre_id

Table labels {
    id           int [pk, increment]  
    name         varchar(100) [not null]  
    image        text
    description  text
    created_at   datetime  
    updated_at   datetime  
}

Table formats [note: "(CD, Vinyl, Digital, etc.)"]{
    id           int [pk, increment]  
    name         varchar(50) [not null]  
    description  text  
    created_at   datetime  
    updated_at   datetime  
}

Table feedback {
    id           int [pk, increment]  
    user_id      int [not null]  
    product_id   int [not null]  
    rating       decimal(2,1) [not null]  
    comment      text  
    created_at   datetime  
    updated_at   datetime   
}
Ref: users.id < feedback.user_id [delete: cascade]
Ref: products.id < feedback.product_id [delete: cascade]

Table orders {
    id               int [pk, increment]  
    user_id          int [not null]  
    order_date       datetime  
    total_amount     int [not null]
    status           int [default: 1, note: "	1. Pending, 2. Processing, 3. Shipping, 4. Delivered, 5. Cancelled, 6. Refunded, 7.Failed"] 
    shipping_address varchar(255)  
    created_at       datetime  
    updated_at       datetime    
}
Ref: users.id < orders.user_id [delete: cascade]

Table order_details {
    id            int [pk, increment]  
    order_id      int [not null]  
    product_id    int [not null]  
    quantity      int [not null]
    total_price   int [not null]  
    created_at    datetime  
    updated_at    datetime    
}
Ref: orders.id < order_details.order_id [delete: cascade]
Ref: products.id < order_details.product_id [delete: cascade]

Table news {
    id           int [pk, increment]  
    title        varchar(150) [not null]
    image        text
    content      text
    active       int [default: 1,note: "1. active, 0. inactive"]
    created_at   datetime  
    updated_at   datetime  
}

Table news_details {
    id           int [pk, increment]  
    news_id      int [not null] 
    product_id   int [not null]  
    created_at   datetime  
    updated_at   datetime  
}
Ref: news.id < news_details.news_id [delete: cascade]
Ref: products.id < news_details.product_id [delete: cascade]

Table promotions {
    id           int [pk, increment]  
    product_id   int [not null]  
    percent      decimal(5,2) [not null] 
    active       int [default: 1]
    start_date   datetime  
    end_date     datetime  
    created_at   datetime  
    updated_at   datetime  
}
Ref: products.id < promotions.product_id [delete: cascade]

Table invoices {
    id              int [pk, increment]  
    order_id        int [not null] 
    invoice_number  varchar(100) [not null]  
    payment_status  int [note: "1, Pending, 2. Delivered, 3. Cancelled, 4. Refunded"] 
    total_amount    int [not null]  
    created_at      datetime  
    updated_at      datetime  
}
Ref: orders.id < invoices.order_id [delete: cascade]