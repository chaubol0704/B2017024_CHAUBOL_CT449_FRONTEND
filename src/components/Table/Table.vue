<template>
    <!-- DataTales Example -->
    <div id="wrapper">
    <div class="d-flex p-5">
            <div class="flex-grow-4 ">
                <ul class=" navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <!-- Nav Item - Pages Collapse Menu -->
                        <li class="nav-item">
                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <!-- <i class="fas fa-fw fa-folder"></i> -->
                                <span>Pages</span>
                            </a>
                            <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div class="bg-white py-2 collapse-inner rounded">
                                    <h6 class="collapse-header">Login Screens:</h6>
                                    <a class="collapse-item" href="login.html">Login</a>
                                    <a class="collapse-item" href="register.html">Register</a>
                                    <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
                                    <div class="collapse-divider"></div>
                                    <h6 class="collapse-header">Other Pages:</h6>
                                    <a class="collapse-item" href="404.html">404 Page</a>
                                    <a class="collapse-item" href="blank.html">Blank Page</a>
                                </div>
                            </div>
                        </li>

                        <!-- Nav Item - Charts -->
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <!-- <i class="fas fa-fw fa-chart-area"></i> -->
                                <span>Charts</span></a>
                        </li>

                        <!-- Nav Item - Tables -->
                        <li class="nav-item active">
                            <a class="nav-link" href="tables.html">
                                <!-- <i class="fas fa-fw fa-table"></i> -->
                                <span>Tables</span></a>
                        </li>

                        <!-- Divider -->
                        <hr class="sidebar-divider d-none d-md-block">

                        <!-- Sidebar Toggler (Sidebar) -->
                        <div class="text-center d-none d-md-inline">
                            <button class="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>

                    </ul>
            </div>
            
            <div class="container-fluid m-3 align-self-center">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Position</th>
                                                                        <th>Office</th>
                                                                        <th>Age</th>
                                                                        <th>Start date</th>
                                                                        <th>Salary</th>
                                                                    </tr>
                                                                </thead>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Position</th>
                                                                        <th>Office</th>
                                                                        <th>Age</th>
                                                                        <th>Start date</th>
                                                                        <th>Salary</th>
                                                                    </tr>
                                                                </tfoot>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Tiger Nixon</td>
                                                                        <td>System Architect</td>
                                                                        <td>Edinburgh</td>
                                                                        <td>61</td>
                                                                        <td>2011/04/25</td>
                                                                        <td>$320,800</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                
                        </div>
                    </div>
                </div>
            </div>
    </div>
        
        
    </div>
    
                                
</template>