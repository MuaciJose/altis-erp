alter table customers
    alter column document set not null;

alter table customers
    alter column type set not null;

alter table customers
alter column type type varchar(2);

alter table customers
    rename column phone to mobile_phone;

alter table customers
    add column status varchar(20) not null default 'ACTIVE',
    add column trade_name varchar(150),
    add column secondary_document varchar(30),
    add column birth_or_foundation_date date,
    add column landline_phone varchar(30),
    add column zip_code varchar(8),
    add column street varchar(150),
    add column number varchar(20),
    add column complement varchar(100),
    add column district varchar(100),
    add column city varchar(100),
    add column state varchar(2),
    add column profession varchar(100),
    add column company_name varchar(150),
    add column responsible_seller varchar(150),
    add column notes text,
    add column tags varchar(255);

alter table customers
    add constraint uq_customers_tenant_document unique (tenant_id, document);

create index idx_customers_tenant_document on customers(tenant_id, document);
create index idx_customers_tenant_status on customers(tenant_id, status);