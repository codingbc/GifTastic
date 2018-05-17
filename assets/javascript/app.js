(function($) {
    $(function() {
        const giphy = {
            topics_array: ["HOCKEY", "BASKETBALL", "SOCCER", "BASEBALL"],
            init() {
                this.dom_cache();
                this.event_binding();
                this.topics_btns();
            },
            dom_cache() {
                this.$btns_container = $('#btns-topics');
                this.$list = $('#list');
                this.$input = $('input');
                this.$add_sport_btn = $('#add-sport');
                this.$msg = $('#msg');
            }, 
            event_binding() {
                this.$btns_container.on('click', 'button.topics', this.get_gifs.bind(this));   
                this.$list.on('click', '.topic-img', this.gify.bind(this));     
                this.$add_sport_btn.on('click', this.create_btn.bind(this));  
            }, 
            topics_btns() { 
                this.$btns_container.html('');   
                for(let i = 0; i < this.topics_array.length; i++){
                    let btn = $(`<button class="topics" data-name="${this.topics_array[i]}">${this.topics_array[i]}</button>`); 
                    this.$btns_container.append(btn);   
                }
            },
            get_gifs(e){
                const topic = $(e.target).attr('data-name');    
                const k = "mS8bYAGpT0BgGELrCAkxaR17Irj7ko0c";    
                const l = "10";  
                const reqURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${k}&limit=${l}`;
                
                $.ajax({   
                    url: reqURL,
                    request: 'GET'
                }).done( res => {
                    console.log(res);   
                    this.$list.html('');    
                    
                    for(let j = 0; j < res.data.length; j++) {  
                        let rating = `${res.data[j].rating.toUpperCase()}`;   
                        let img_src = `${res.data[j].images["480w_still"].url}`;   
                        let gif_src = `${res.data[j].images.downsized.url}`;    
                        
                        const rating_p = $(`<p class="topic-p"><strong>Rating:</strong> ${rating}</p>`)  
                      
                        const static_img = $(`<img class="topic-img" src="${img_src}" data-status="static" data-img="${img_src}" data-gif="${gif_src}">`);   
                        const item_container = $(`<div class="item-container">`);   
                        
                        item_container.append(rating_p, static_img);   
                        this.$list.append(item_container);  
                    }
                });
            },
            gify(e){   
                const $target = $(e.target);
                const $gif_src = $target.attr('data-gif');   
                const $img_src = $target.attr('data-img');   
                const $status = $target.attr('data-status'); 
              
                if($status === 'static') {
                    $target.attr('data-status', 'animated');
                    $target.attr('src', $gif_src);
                    console.log($target);
                } 
                else {
                    $target.attr('data-status', 'static');
                    $target.attr('src', $img_src);
                }
            },
            create_btn(){
                const new_topic = this.$input.val().toUpperCase();  
                const already_in_arr = this.topics_array.indexOf(new_topic);    

                if (already_in_arr < 0){    
                    this.topics_array.push(new_topic);  
                    this.$input.val('');    
                    this.topics_btns(); 
                }
                else {  
                    this.$msg.html(`You have already added <i>${new_topic}</i>!`);      
                    setTimeout(this.clear_msg.bind(this), 3000);    
                }
            },
            clear_msg() {
                this.$msg.html('');
            }
        }
        giphy.init();
    });
    
})(jQuery);