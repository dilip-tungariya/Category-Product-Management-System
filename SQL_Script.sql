USE [Category_Product_Management_System]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 1/18/2025 10:28:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](50) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 1/18/2025 10:28:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [varchar](50) NOT NULL,
	[CategoryId] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
/****** Object:  StoredProcedure [dbo].[usp_category]    Script Date: 1/18/2025 10:28:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[usp_category]
(
@CategoryName varchar(50) = '',
@CategoryId int = 0,
@Flag varchar(20) = '',
@PageNum int = 1,
@PageSize int = 10
)
as
BEGIN
	IF @Flag = 'GET'
	BEGIN
		Select count(CategoryId) as 'TotalRecords' from Category;

		Select * from Category
		ORDER BY CategoryId
		OFFSET (@PageNum - 1) * @PageSize ROWS
		FETCH NEXT @PageSize ROWS ONLY;
	END
	IF @Flag = 'INSERT'
	BEGIN
		INSERT INTO Category
		(CategoryName)
		Values
		(@CategoryName);

		Select 'Category saved successfully' as message;
	END
	IF @Flag = 'UPDATE'
	BEGIN
		Update Category
		set CategoryName = @CategoryName
		where CategoryId = @CategoryId;

		Select 'Category updated successfully' as message;
	END
	IF @Flag = 'DELETE'
	BEGIN
		delete from Category 		
		where CategoryId = @CategoryId;

		Select 'Category deleted successfully' as message;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_product]    Script Date: 1/18/2025 10:28:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[usp_product]
(
@ProductName varchar(50) = '',
@ProductId int = 0,
@CategoryId int = 0,
@Flag varchar(20) = '',
@PageNum int = 1,
@PageSize int = 10
)
as
BEGIN
	IF @Flag = 'GET'
	BEGIN
		Select count(ProductId) as 'TotalRecords' from [Product];

		Select 
		P.ProductId,P.ProductName,P.CategoryId,C.CategoryName
		from [Product] P
		inner join Category C on C.CategoryId = P.CategoryId
		ORDER BY P.ProductId
		OFFSET (@PageNum - 1) * @PageSize ROWS
		FETCH NEXT @PageSize ROWS ONLY;
	END
	IF @Flag = 'INSERT'
	BEGIN
		INSERT INTO [Product]
		(ProductName,CategoryId)
		Values
		(@ProductName,@CategoryId);

		Select 'Product saved successfully' as message;
	END
	IF @Flag = 'UPDATE'
	BEGIN
		Update [Product]
		set ProductName = @ProductName,
		CategoryId = @CategoryId
		where ProductId = @ProductId;

		Select 'Product updated successfully' as message;
	END
	IF @Flag = 'DELETE'
	BEGIN
		delete from [Product] 		
		where ProductId = @ProductId;

		Select 'Product deleted successfully' as message;
	END
END
GO
