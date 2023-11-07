<template>
    <!-- Product tab -->
    <div class="col-md-12">
        <div id="product-tab">
            <!-- product tab nav -->
            <ul class="tab-nav">
                <li class="active"><a data-toggle="tab" href="#tab1">Chi tiết</a></li>
                <li><a data-toggle="tab" href="#tab2">Đánh giá ({{ COUNT }})</a></li>
            </ul>
            <!-- /product tab nav -->

            <!-- product tab content -->
            <div class="tab-content">
                <!-- tab1  -->
                <div id="tab1" class="tab-pane fade in active">
                    <div class="row">
                        <div class="col-md-12">
                            <p>Màn hình: {{ data.manHinh }}</p>
                            <p>Camera trước: {{ data.cameraTruoc }}</p>
                            <p>Camera sau: {{ data.cameraSau }}</p>
                            <p>CPU: {{ data.cpu }}</p>
                            <p>RAM: {{ data.ram }}</p>
                            <p>Bộ nhớ: {{ data.rom }}</p>
                            <P>Thẻ nhớ: {{ data.theNho }}</P>
                            <p>Sim: {{ data.sim }}</p>
                        </div>
                    </div>
                </div>
                <!-- /tab1  -->

                <!-- tab2  -->
                <div id="tab2" class="tab-pane fade in">
                    <div class="row">
                        <!-- Rating -->
                        <div class="col-md-3">
                            <div id="rating">
                                <div class="rating-avg">
                                    <span>4.5</span>
                                    <div class="rating-stars">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                </div>
                                <ul class="rating">
                                    <li>
                                        <div class="rating-stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="rating-progress">
                                            <div style="width: 80%;"></div>
                                        </div>
                                        <span class="sum">3</span>
                                    </li>
                                    <li>
                                        <div class="rating-stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                        </div>
                                        <div class="rating-progress">
                                            <div style="width: 60%;"></div>
                                        </div>
                                        <span class="sum">2</span>
                                    </li>
                                    <li>
                                        <div class="rating-stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                        </div>
                                        <div class="rating-progress">
                                            <div></div>
                                        </div>
                                        <span class="sum">0</span>
                                    </li>
                                    <li>
                                        <div class="rating-stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                        </div>
                                        <div class="rating-progress">
                                            <div></div>
                                        </div>
                                        <span class="sum">0</span>
                                    </li>
                                    <li>
                                        <div class="rating-stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                        </div>
                                        <div class="rating-progress">
                                            <div></div>
                                        </div>
                                        <span class="sum">0</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /Rating -->

                        <!-- Reviews -->
                        <div class="col-md-6">

                            <div id="reviews">
                                {{ #if COMMENTS }}
                                {{ #each COMMENTS }}
                                <ul class="reviews" id="comment">
                                    <li>
                                        <div class="review-heading">
                                            <h5 class="name">{{ this.ten }}</h5>
                                            <p class="date">{{ this.dateTime }}</p>
                                            <div class="review-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-o empty"></i>
                                            </div>
                                        </div>
                                        <div class="review-body">
                                            <p>{{ this.nhanXet }}</p>
                                        </div>
                                    </li>

                                </ul>
                                {{ /each}}
                                {{ /if}}
                            </div>
                        </div>
                        <!-- /Reviews -->

                        <!-- Review Form -->
                        <div class="col-md-3">
                            <div id="review-form">



                                <form class="review-form" method="POST" action="/comment/add/{{data._id}}">
                                    {{ #if user }}
                                    <textarea class="input" name="nhanXet" placeholder="Đánh giá"></textarea>
                                    <div class="input-rating">
                                        <span>Xếp hạng: </span>
                                        <div class="stars">
                                            <input id="star5" name="rating" value="5" type="radio"><label
                                                for="star5"></label>
                                            <input id="star4" name="rating" value="4" type="radio"><label
                                                for="star4"></label>
                                            <input id="star3" name="rating" value="3" type="radio"><label
                                                for="star3"></label>
                                            <input id="star2" name="rating" value="2" type="radio"><label
                                                for="star2"></label>
                                            <input id="star1" name="rating" value="1" type="radio"><label
                                                for="star1"></label>
                                        </div>
                                    </div>
                                    <button class="primary-btn">Đánh giá</button>
                                    {{else }}
                                    <input class="input" type="text" name="ten" placeholder="Tên của bạn">
                                    <textarea class="input" name="nhanXet" placeholder="Đánh giá"></textarea>
                                    <div class="input-rating">
                                        <span>Xếp hạng: </span>
                                        <div class="stars">
                                            <input id="star5" name="rating" value="5" type="radio"><label
                                                for="star5"></label>
                                            <input id="star4" name="rating" value="4" type="radio"><label
                                                for="star4"></label>
                                            <input id="star3" name="rating" value="3" type="radio"><label
                                                for="star3"></label>
                                            <input id="star2" name="rating" value="2" type="radio"><label
                                                for="star2"></label>
                                            <input id="star1" name="rating" value="1" type="radio"><label
                                                for="star1"></label>
                                        </div>
                                    </div>
                                    <button class="primary-btn">Đánh giá</button>
                                    {{ /if}}
                                </form>
                            </div>
                        </div>
                        <!-- /Review Form -->
                    </div>
                </div>
                <!-- /tab2  -->
            </div>
            <!-- /product tab content  -->
        </div>
    </div>
<!-- /product tab -->
</div>
<!-- /row -->
</div>
<!-- /container -->
</div>
<!-- /SECTION --></template>