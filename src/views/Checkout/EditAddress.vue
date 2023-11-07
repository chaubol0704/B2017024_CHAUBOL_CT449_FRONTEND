<template>
    <!-- SECTION -->
    <div class="section">
        <!-- container -->
        <div class="container">
            <!-- row -->
            <div class="row">
                <form method="POST" action="/cart/editAddress/{{data._id}}">
                    <div class="col-md-7">
                        <!-- Billing Details -->
                        <div class="billing-details">
                            <div class="section-title">
                                <h3 class="title">Địa chỉ thanh toán và nhận hàng</h3>
                            </div>
                            <div class="form-group">
                                <input class="input" value="{{data.nguoiNhan}}" type="text" name="nguoiNhan" placeholder="Tên">
                            </div>
                            <div class="form-group">
                                <input class="input" value="{{data.sdtNguoiNhan}}" type="tel" name="sdtNguoiNhan" placeholder="Số điện thoại">
                            </div>
                            <div class="form-group">
                                <input class="input" value="{{data.diaChiNhan}}" type="text" name="diaChiNhan" placeholder="Địa chỉ">
                            </div>
                            <div>
                                <input class="primary-btn order-submit" type="submit" value="Thay đổi"/>
                            </div>
                        </div>
                        <!-- /Billing Details -->
                    </div>
                
                </form>
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>
    <!-- /SECTION -->
</template>